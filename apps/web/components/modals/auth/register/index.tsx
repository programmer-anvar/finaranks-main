import { Button } from "@finranks/design-system/components/Button"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@finranks/design-system/components/modal"
import { Typography } from "@finranks/design-system/components/typography"
import { Lock, Mail, User, X } from "lucide-react";
import { FastField, type FieldProps, Form, Formik } from "formik";
import { useMemo, useState } from "react";
import { registerSchema } from "@/model/auth/register";
import { Input } from "@finranks/design-system/components/field/input";
import PasswordInput from "@finranks/design-system/components/field/password-input";
import { Label } from "@finranks/design-system/components/label";
import { Checkbox } from "@finranks/design-system/components/checkbox";
import Link from "next/link";
import { useAppContext } from "@/lib/providers/customs/app";
import axios from "axios";
import config from "@/lib/config";
import { useRouter } from "next/navigation";
import get from "lodash/get";
import { toast } from "@finranks/design-system/components/sonner";
import GoogleSignInButton from "@/components/google-signin-button";
import { useModals } from "@/stores/modal";


type TRegisterForm = {
    full_name: string,
    email: string,
    password: string
    privacy_policy?: boolean
}


const RegisterModal = ({ dictionary }: { dictionary: any }) => {
    const { setState, state } = useAppContext();
    const router = useRouter();
    const { register, setModal } = useModals();
    
    const dic = dictionary?.auth;
    const commonDic = dictionary?.common;


    const handleSubmit = async (
        values: TRegisterForm,
        { setSubmitting }: { setSubmitting: (value: boolean) => void }
    ) => {
        try {
            await axios.post(
                `${config.APP_URL}/auth/register/`,
                {
                    email: values.email,
                    password: values.password,
                    full_name: values.full_name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${state.anonymous_access_token}`,
                    },
                }
            );

            const registerData = {
                email: values.email,
                password: values.password,
                full_name: values.full_name,
            };

            localStorage.setItem('registerData', JSON.stringify(registerData));

            setState(prev => ({
                ...prev,
                registerData,
            }));

            router.push('/account/verify');
        } catch (error) {
            const message = get(
                error,
                'response.data.message',
                commonDic?.somethingWentWrong
            );
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues = useMemo<TRegisterForm>(() => {
        return {
            full_name: "",
            email: "",
            password: "",
            privacy_policy: false
        };
    }, []);


    return (
        <Modal open={register} onOpenChange={() => setModal({ register: false })}>
            <ModalContent classNames={{
                closeButton: "hidden"
            }}>
                <ModalHeader >
                    <ModalTitle className="flex items-center justify-between">
                        <div className="mt-2">
                            <span className="text-white">{dic?.registration?.registration}</span>
                            <Typography variant="small" color="helper">{dic?.registration?.registrationSubTitle}</Typography>
                        </div>
                        <Button onClick={() => setModal({ register: false })} hasIconOnly iconDescription={commonDic?.close} variant="outline"><X /></Button>
                    </ModalTitle>
                </ModalHeader>

                <div>
                    <Formik<TRegisterForm>
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={registerSchema}
                    >
                        {({ isValid, dirty, submitForm, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="space-y-4 p-4">
                                        <div className="flex flex-col gap-2">
                                            <FastField name="full_name">
                                                {({ field, meta, form }: FieldProps) => (
                                                    <Input
                                                        placeholder={dic?.fullNamePlaceholder}
                                                        {...field}
                                                        size="lg"
                                                        label={dic?.fullName}
                                                        prepend={<User />}
                                                        isClearable={!form.isSubmitting}
                                                        disabled={form.isSubmitting}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();

                                                                if (isValid && dirty && !form.isSubmitting) {
                                                                    submitForm();
                                                                }
                                                            }
                                                        }}
                                                        maxLength={128}
                                                        isInvalid={meta.touched && !!meta.error}
                                                        errorMessage={meta.touched ? meta.error : ""}
                                                    />
                                                )}
                                            </FastField>
                                            <FastField name="email">
                                                {({ field, meta, form }: FieldProps) => (
                                                    <Input
                                                        placeholder={dic?.emailPlaceholder}
                                                        {...field}
                                                        size="lg"
                                                        label={dic?.email}
                                                        prepend={<Mail />}
                                                        isClearable={!form.isSubmitting}
                                                        disabled={form.isSubmitting}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();

                                                                if (isValid && dirty && !form.isSubmitting) {
                                                                    submitForm();
                                                                }
                                                            }
                                                        }}
                                                        maxLength={128}
                                                        isInvalid={meta.touched && !!meta.error}
                                                        errorMessage={meta.touched ? meta.error : ""}
                                                    />
                                                )}
                                            </FastField>
                                            <FastField name="password">
                                                {({ field, meta }: FieldProps) => (
                                                    <PasswordInput
                                                        inputProps={{
                                                            placeholder: dic?.passwordPlaceholder,
                                                            label: dic?.password,
                                                            ...field,
                                                            maxLength: 128,
                                                            isInvalid: meta.touched && !!meta.error,
                                                            errorMessage: meta.touched ? meta.error : "",
                                                            prepend: <Lock />,
                                                            size: "lg"
                                                        }}
                                                    />
                                                )}
                                            </FastField>
                                            <FastField name="privacy_policy">
                                                {({ field, form }: FieldProps) => (
                                                    <Label>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox checked={field.value} onCheckedChange={(e) => form.setFieldValue(field.name, e)} />
                                                            <span>{dic?.iAgreeToThe} <button type="button" className="underline" onClick={() => {
                                                                router.push('/privacy-policy');
                                                                setModal({ register: false })
                                                            }}>{commonDic?.privacyPolicy}</button></span>
                                                        </div>
                                                    </Label>
                                                )}
                                            </FastField>

                                            <Button className="mt-5" isDisabled={!isValid || isSubmitting} isLoading={isSubmitting} type="submit">{dic?.getStartedBtn}</Button>

                                            <Typography variant="small" color="primary">{dic?.registration?.account} <Link href="#" className="underline text-blue-500! font-semibold" onClick={() => setModal({ signIn: true, register: false })} >{dic?.signIn?.signIn}</Link></Typography>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    <div className="px-4 pb-4">
                        <div className="modal-form__or">{dic?.or}</div>
                        <GoogleSignInButton dictionary={dictionary} />
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

export default RegisterModal

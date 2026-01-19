import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import tokenService from "../base/token";
import config from "@/lib/config";
import axios from "axios";
import { useConfirm } from "@finranks/design-system/components/confirm-dialog";
import { toast } from "@finranks/design-system/components/sonner";
import { useModals } from "@/stores/modal";
import { PlusCircle } from "lucide-react";

export const useWatchlist = () => {
    const { isAuthenticated } = useAuth();
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingTicker, setDeletingTicker] = useState<string | null>(null);
    const [addingToWatchList, setAddingToWatchList] = useState(false);
    const confirm = useConfirm();
    const { setModal } = useModals()

    const fetchWatchlist = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${config.APP_URL}/watchlist/my-watchlist/companies`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setWatchlist(data?.data?.map((item: any) => item?.ticker || ""));
        } catch (err) {
            console.error("Failed to fetch watchlist", err);
        } finally {
            setLoading(false);
        }
    };


    const addToWatchlist = async (symbol: string) => {
        if (!isAuthenticated) {
            setModal({ signIn: true });
            return;
        }

        try {
            setAddingToWatchList(true);
            const token = localStorage.getItem("access_token"); // or from auth store
            if (!token) throw new Error("Missing auth token");

            const res = await fetch(
                `${config.APP_URL}/watchlist/companies`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${tokenService.getToken()}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: symbol,
                        watchlistId: "my-watchlist"
                    }),
                }
            );

            fetchWatchlist()
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error?.message || "Failed to add to watchlist");
            }

            // ✅ success feedback (toast / UI state)
            toast.success("Added to watchlist");

            setAddingToWatchList(false)
        } catch (err) {
            toast.error(`${err}`);
            // ❌ show toast / error modal if needed
        } finally {
            setAddingToWatchList(false);
        }
    };



    const token = tokenService.getToken();

    useEffect(() => {
        if (!isAuthenticated || !token) return;
        fetchWatchlist();
    }, [isAuthenticated, token]);


    /* ------------------ REMOVE FROM WATCHLIST ------------------ */
    const removeFromWatchlist = useCallback(
        async (ticker: string) => {
            if (!token || deletingTicker) return;

            setDeletingTicker(ticker);

            try {
                await axios.delete(
                    `${config.APP_URL}/watchlist/companies`,
                    {
                        data: {
                            id: ticker,
                            watchlistId: "my-watchlist",
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // ✅ Optimistic update (best UX)
                setWatchlist((prev) =>
                    prev.filter((item) => item !== ticker)
                );
                fetchWatchlist();
            } catch (err) {
                console.error("[WATCHLIST] Delete failed:", err);
            } finally {
                setDeletingTicker(null);
            }
        },
        [token, deletingTicker]
    );

    const handleRemoveFromWatchlist = async (ticker: string) => {
        const result = await confirm({
            title: "Are you sure?",
            description: "Are you sure you want to remove this item from watchlist?",
            confirmText: "Remove",
            confirmButton: {
                variant: "destructive",
            },
        });

        if (result?.confirmed) {
            confirm.setLoading(true);
            await removeFromWatchlist(ticker);
            confirm.setLoading(false);
            result.close();
        }
    };

    const handleAddWatchList = async (symbol: string) => {
        if (!isAuthenticated) {
            setModal({ signIn: true });
            return;
        }
        const result = await confirm({
            title: "Are you sure?",
            description: "Are you sure you want to add this item to watchlist?",
            confirmText: "Add to watchlist",
            confirmButton: {
                prepend: <PlusCircle className="size-4" />,
            },
        });

        if (result?.confirmed) {
            confirm.setLoading(true);
            await addToWatchlist(symbol);
            confirm.setLoading(false);
            result.close();
        }
    };

    return {
        watchlist,
        loading,
        isInWatchlist: (symbol: string) => watchlist.includes(symbol),
        refetch: () => setWatchlist([]),
        handleRemoveFromWatchlist,
        fetchWatchlist,
        addToWatchlist,
        addingToWatchList,
        deletingTicker
    };
};

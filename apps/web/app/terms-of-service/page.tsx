import Link from 'next/link';
import './terms.css';
export const metadata = {
    title: 'Terms of Service | FinRanks',
    description: 'FinRanks Terms of Service - Rules and guidelines for using our platform',
};

export default function TermsOfServicePage() {
    return (
        <div className="app-container">
            <div className="header-offset"></div>
            <div className="main-box main-top mb-20 --auto mt-10 md:mt-4">
                <div style={{ marginBottom: '20px' }}>
                    <Link href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
                        ← Back to Home
                    </Link>
                </div>
                <h1 className="main-box__title" style={{ fontSize: '28px', marginBottom: '8px', color: '#fcfcfc', fontWeight: '700' }}>
                    Terms of Service
                </h1>
                <p style={{ fontSize: '14px', color: 'rgb(102, 102, 102)', marginBottom: '30px' }}>
                    Last Updated: February 1, 2025
                </p>

                <div className="main-box__text text-[#fcfcfc]">
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        1. Agreement to Terms
                    </h2>
                    <p>
                        Welcome to FinRanks, your comprehensive stock analysis platform. FinRanks provides advanced tools and data to help you analyze stocks with precision, make informed investment decisions, and track market opportunities.
                    </p>
                    <p>
                        By accessing or using our platform, services, and applications (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                    </p>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        2. Eligibility
                    </h2>
                    <p>To use FinRanks, you must:</p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>Be at least 18 years of age</li>
                        <li>Have the legal capacity to enter into a binding contract</li>
                        <li>Not be prohibited from using the Services under applicable laws</li>
                        <li>Provide accurate and complete registration information</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        3. Account Registration and Security
                    </h2>
                    <p>To access certain features, you must create an account by providing a valid email address and creating a password, or by signing in with Google OAuth.</p>
                    <p>You are responsible for:</p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Notifying us immediately of any unauthorized access or security breach</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        4. Description of Services
                    </h2>
                    <p><strong>What FinRanks Provides:</strong></p>
                    <p>FinRanks is a comprehensive stock analysis platform. With FinRanks, you can:</p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>📊 <strong>Analyze stocks with precision:</strong> Get comprehensive financial data, valuation metrics, and industry comparisons in one place</li>
                        <li>⭐ <strong>Smart scoring system:</strong> Our proprietary algorithm rates companies on financial strength, profitability, growth, and valuation</li>
                        <li>📈 <strong>Real-time market data:</strong> Access live quotes, news sentiment analysis, and analyst ratings</li>
                        <li>🎯 <strong>Make informed decisions:</strong> Compare companies, track trends, and identify investment opportunities with confidence</li>
                    </ul>
                    <p><strong>Additional Features:</strong></p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>Watchlist management and portfolio tracking</li>
                        <li>Custom screening and filtering tools</li>
                        <li>Historical performance analysis</li>
                        <li>Financial charts and visualizations</li>
                        <li>Company profiles and executive information</li>
                    </ul>
                    <p><strong>Important Notice - What We Do NOT Provide:</strong></p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>FinRanks is NOT a financial advisor or broker-dealer</li>
                        <li>We do NOT provide personalized investment advice or recommendations</li>
                        <li>We do NOT execute trades or manage portfolios</li>
                        <li>We do NOT guarantee investment returns or outcomes</li>
                        <li>We are NOT responsible for your investment decisions</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        5. User Responsibilities and Conduct
                    </h2>
                    <p>You may NOT:</p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>Use the Services for any illegal or unauthorized purpose</li>
                        <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                        <li>Use automated tools (bots, scrapers) to access or extract data without permission</li>
                        <li>Interfere with or disrupt the Services or servers</li>
                        <li>Upload malicious code, viruses, or harmful software</li>
                        <li>Impersonate another person or entity</li>
                        <li>Sell, resell, or commercially exploit the Services without authorization</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        6. Subscription and Payment Terms
                    </h2>
                    <p>FinRanks offers both free and premium subscription plans. If you subscribe to a paid plan:</p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>Fees are charged on a recurring basis (monthly or annually)</li>
                        <li>You authorize us to charge your payment method automatically</li>
                        <li>All fees are non-refundable unless otherwise stated</li>
                        <li>You may cancel your subscription at any time</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        7. Intellectual Property Rights
                    </h2>
                    <p>All content, features, and functionality of FinRanks are owned by us and protected by copyright, trademark, and other intellectual property laws.</p>
                    <p>You may not:</p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>Copy, modify, or create derivative works of the Services</li>
                        <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
                        <li>Rent, lease, sell, or sublicense the Services</li>
                        <li>Remove or alter any proprietary notices</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        8. Third-Party Services and Data
                    </h2>
                    <p>
                        FinRanks aggregates financial data, market quotes, news, and analyst ratings from third-party providers. While we strive to provide accurate and timely information, we do not guarantee the accuracy, completeness, timeliness, or reliability of any third-party data.
                    </p>
                    <p>
                        Our smart scoring system and analytics are based on publicly available financial data and our proprietary algorithms. Scores and ratings reflect historical performance and current metrics, not future predictions.
                    </p>
                    <p>
                        If you sign in with Google, you agree to Google's Terms of Service and Privacy Policy. We are not responsible for Google's practices or services.
                    </p>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        9. Disclaimers and Limitation of Liability
                    </h2>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                        9.1 Investment Disclaimer
                    </h3>
                    <p><strong>IMPORTANT - READ CAREFULLY:</strong></p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>FinRanks is a data analysis tool, NOT a financial advisor</li>
                        <li>All data is for informational purposes only</li>
                        <li>We do NOT provide investment advice, recommendations, or guidance</li>
                        <li>Past performance does not guarantee future results</li>
                        <li>All investments carry risk, including loss of principal</li>
                        <li>You are solely responsible for your investment decisions</li>
                    </ul>

                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                        9.2 "AS IS" Disclaimer
                    </h3>
                    <p>
                        The Services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind.
                    </p>

                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '20px', marginBottom: '10px' }}>
                        9.3 Limitation of Liability
                    </h3>
                    <p>
                        <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
                    </p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li>FinRanks shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                        <li>Our total liability shall not exceed the amount you paid us in the past 12 months</li>
                    </ul>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        10. Privacy and Data Protection
                    </h2>
                    <p>
                        Your use of the Services is also governed by our{' '}
                        <a href="/privacy-policy" style={{ color: '#007bff' }}>Privacy Policy</a>, which describes how we collect, use, and protect your personal information.
                    </p>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        11. Modifications to Terms and Services
                    </h2>
                    <p>
                        We reserve the right to modify these Terms at any time. We will notify you of material changes by posting updated Terms on this page and updating the "Last Updated" date.
                    </p>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        12. Termination
                    </h2>
                    <p>
                        You may terminate your account at any time. We may suspend or terminate your account if you breach these Terms or engage in fraudulent or illegal activity.
                    </p>

                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginTop: '30px', marginBottom: '12px' }}>
                        13. Contact Information
                    </h2>
                    <p>
                        For questions about these Terms, please contact us:
                    </p>
                    <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                        <li><strong>Email:</strong> support@finranks.com</li>
                        <li><strong>Website:</strong> <a href="https://finranks.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>https://finranks.com</a></li>
                    </ul>

                    <div style={{
                        background: '#fff3cd',
                        border: '2px solid #ffc107',
                        borderRadius: '4px',
                        padding: '24px',
                        marginTop: '40px'
                    }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#856404', marginBottom: '16px' }}>
                            ⚠️ Critical Investment Disclaimer
                        </h3>
                        <p style={{ color: '#856404', marginBottom: '12px' }}>
                            <strong>FinRanks is a stock analysis platform that provides tools and data, NOT a licensed financial advisor, broker-dealer, or investment service.</strong>
                        </p>
                        <p style={{ color: '#856404', marginBottom: '12px' }}>
                            <strong>What we provide:</strong> Comprehensive financial data, smart scoring algorithms, real-time market data, valuation metrics, news sentiment analysis, comparison tools, and screening features to support your investment research.
                        </p>
                        <p style={{ color: '#856404', marginBottom: '12px' }}>
                            All information, data, charts, scores, and tools provided on FinRanks are for <strong>informational and educational purposes only</strong>. They should NOT be considered as personalized investment advice, recommendations, or guarantees of future performance.
                        </p>
                        <p style={{ color: '#856404', marginBottom: '12px' }}>
                            <strong>Investing involves significant risk, including the possible loss of principal.</strong> Past performance does not guarantee future results. Stock scores and ratings are based on historical data and algorithms, not predictions.
                        </p>
                        <p style={{ color: '#856404', marginBottom: 0 }}>
                            <strong>You are solely responsible for your investment decisions and any consequences thereof.</strong> Before making any investment decisions, consult with a qualified, licensed financial advisor who understands your individual financial situation, goals, and risk tolerance.
                        </p>
                    </div>

                    <div style={{
                        background: '#e7f3ff',
                        border: '1px solid #0066cc',
                        borderRadius: '4px',
                        padding: '20px',
                        marginTop: '30px',
                        textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '16px', fontWeight: 600, color: '#003d7a', margin: 0 }}>
                            By using FinRanks, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

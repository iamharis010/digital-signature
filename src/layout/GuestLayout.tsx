import GithubCorner from "@components/molecules/GithubCorner/GithubCorner";
import { Outlet } from "react-router";

const GuestLayout = () => {
    return (
        <div className="flex flex-col h-screen justify-between">
            {/* Header */}
			<GithubCorner url="https://github.com/iamharis010/digital-signature" />
            <Outlet />
            {/* Footer */}
            <footer className="sticky bottom-[15px] top-[100vh] text-center pb-6">
                <p className="text-gray-600">
                    © {new Date().getFullYear()} Introduced with{" "}
                    <span className="text-red-500">❤️</span> by <a href="https://github.com/iamharis010" target="_blank" className="text-blue-500 no-underline font-bold hover:text-blue-600">Mohammad Haris</a>
                </p>
            </footer>
        </div>
    );
};

export default GuestLayout;

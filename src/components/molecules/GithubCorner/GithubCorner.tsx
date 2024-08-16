import GithubCornerIcon from "@components/atoms/GithubCorner/GithubCornerIcon";

type GithubCorner = {
    url: string;
}
const GithubCorner = ({ url }: GithubCorner) => {
    return (
        <a
            href={url}
            className="github-corner mt-0"
            aria-label="View source on GitHub"
            target="_blank"
        >
            <GithubCornerIcon/>
        </a>
    );
};

export default GithubCorner;

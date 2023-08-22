interface Link {
	name: string;
	url: string
}

interface SiteConfig {
	author: string;
	title: string;
	description: string;
	lang: string;
	ogLocale: string;
	themeColor: string;
	menuLinks: Link[];
	socialLinks: Link[];
}

export const siteConfig: SiteConfig = {
	author: "Sebastien Lovergne",
	title: "Sebastien Lovergne",
	description: "A humble tinkerer website about his interests",
	lang: "en-US",
	ogLocale: "en_US",
	themeColor: "#0ac8f5",
	menuLinks: [
		{ name: "Awesome list", url: "/awesome" },
		{ name: "Resume", url: "/resume" },
		{ name: "RSS", url: "/rss.xml" },

	],
	socialLinks: [
		{ name: "github", url: "https://github.com/TheBigRoomXXL" },
		{ name: "itch.io", url: "https://tehbigroomxxl.itch.io/" },
		{ name: "email", url: "mailto:seb.lovergne+site@gmail.com?Subject=Hello" },
	],
};

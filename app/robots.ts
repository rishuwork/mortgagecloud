import { MetadataRoute } from "next";

export const runtime = 'edge';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://rishabahuja.ca";

    return {
        rules: [
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
            },
            {
                userAgent: "Twitterbot",
                allow: "/",
            },
            {
                userAgent: "facebookexternalhit",
                allow: "/",
            },
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}

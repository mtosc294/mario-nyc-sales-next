import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mario Toscano NYC Real Estate",
    short_name: "Mario NYC",
    description: "NYC property strategy for sellers, buyers and investors.",
    start_url: "/",
    display: "standalone",
    background_color: "#101B2D",
    theme_color: "#101B2D",
  };
}

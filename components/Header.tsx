import Head from "next/head";

const Header = ({ title, keywords, description }) => {
  const globalKeywords =
    "skin care, organic, vegan, beauty, sleep oil, lip oil, sustainable, homegrown";

  const globalDesc =
    "MyTry is a homegrown skincare brand that works closely with responsibly sourced ingredients. We are different because we are vegan. Our products are organic and made with care by our founder Maitri and constitute raw materials you can find in your kitchen. Maitri overlooks every stage of the production process. From choosing the ingredients to adding the right amount of essential oils, she adds her touch throughout.";
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content={keywords ? `${keywords}, ${globalKeywords}` : globalKeywords}
      />
      <meta
        name="description"
        content={description ? description : globalDesc}
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title ? `${title} | MyTry` : "MyTry"}</title>
    </Head>
  );
};

export default Header;

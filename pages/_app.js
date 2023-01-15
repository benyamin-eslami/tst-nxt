import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <h1>footer</h1>
    </>
  );
}

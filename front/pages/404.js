import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <h1 style={{ color: "tomato" }}>404 - Page Not Found</h1>
      <button
        style={{
          color: "black",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        Go To Home
      </button>
    </>
  );
}

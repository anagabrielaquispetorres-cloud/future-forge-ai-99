import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProfileProvider } from "@/context/ProfileContext";
import { Landing } from "@/components/impulsa/Landing";
import { Auth } from "@/components/impulsa/Auth";
import { Onboarding } from "@/components/impulsa/Onboarding";
import { Analyzing, ProfileSynthesis } from "@/components/impulsa/ProfileSynthesis";
import { BottomNav, type Tab } from "@/components/impulsa/BottomNav";
import { Home } from "@/components/impulsa/Home";
import { Chat } from "@/components/impulsa/Chat";
import { Explore } from "@/components/impulsa/Explore";
import { MiRuta } from "@/components/impulsa/MiRuta";
import { ProfileView } from "@/components/impulsa/ProfileView";

const TITLE = "ImpulsaIA — Mentor virtual de orientación vocacional";
const DESC =
  "ImpulsaIA es tu mentor virtual con IA: descubre tus intereses, fortalezas y caminos de carrera, oficios, cursos y becas hechos a tu medida.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <ProfileProvider>
      <App />
    </ProfileProvider>
  ),
});

type Screen = "landing" | "auth" | "onboarding" | "analyzing" | "synthesis" | "hub";

function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [tab, setTab] = useState<Tab>("inicio");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main className="mx-auto min-h-screen max-w-md bg-background">
      {screen === "landing" && <Landing onStart={() => setScreen("auth")} />}
      {screen === "auth" && <Auth onDone={() => setScreen("onboarding")} />}
      {screen === "onboarding" && <Onboarding onDone={() => setScreen("analyzing")} />}
      {screen === "analyzing" && <Analyzing onDone={() => setScreen("synthesis")} />}
      {screen === "synthesis" && <ProfileSynthesis onDone={() => setScreen("hub")} />}

      {screen === "hub" && (
        <>
          {showProfile ? (
            <ProfileView
              onBack={() => setShowProfile(false)}
              onReset={() => {
                setShowProfile(false);
                setScreen("landing");
                window.location.reload();
              }}
            />
          ) : (
            <>
              {tab === "inicio" && <Home go={setTab} openProfile={() => setShowProfile(true)} />}
              {tab === "ia" && <Chat />}
              {tab === "explora" && <Explore />}
              {tab === "ruta" && <MiRuta />}
            </>
          )}
          <BottomNav tab={tab} setTab={(t) => { setShowProfile(false); setTab(t); }} />
        </>
      )}
    </main>
  );
}

import UserInnerPage from "../components/dashboard/user-inner-page";

export function generateMetadata() {
  return {
    title: "Dashboard | Noku Coffee",
    description: "Dashboard | Noku Coffee",
    keywords: ["dashboard", "noku coffee", "user"],
    openGraph: {
      title: "Dashboard | Noku Coffee",
      description: "Dashboard | Noku Coffee",
    },
    twitter: {
      title: "Dashboard | Noku Coffee",
      description: "Dashboard | Noku Coffee",
    },
  };
}

export default function UserPage() {
  return <UserInnerPage />;
}

import AccountSection from "@/components/account/AccountSection";

// Simulated user data (replace with actual user authentication)
const user = {
    name: "John Doe",
    email: "john.doe@example.com",
};

export default function AccountPage() {
    // In a real app, fetch user data from authentication or API
    // const user = await getUser();

    return (
        <main className="min-h-screen">
            <AccountSection user={user} />
        </main>
    );
}
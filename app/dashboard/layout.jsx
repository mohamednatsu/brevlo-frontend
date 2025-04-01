import DashboardMainLayout from "./Dashboard";

// app/dashboard/layout.js (Server Component)
export const metadata = {
       title: 'My Dashboard | Brevlo AI',
       description: 'Your personalized lecture summary dashboard',
       robots: 'noindex, nofollow',
       openGraph: {
              title: 'Brevlo Dashboard',
              description: 'Manage your AI-generated lecture summaries',
       },
       alternates: {
              canonical: false,
       }
};

export default function DashboardLayout({ children }) {
       return (
              <html lang="en">
                     <body>
                            <DashboardMainLayout>{children}</DashboardMainLayout>
                     </body>
              </html>
       );
}
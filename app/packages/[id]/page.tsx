// app/packages/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageClientView from "./client-package";

type Props = {
  params: Promise<{ id: string }>;
};

// HELPER: Shared fetcher
async function getPackageData(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // Using cache: 'force-cache' or revalidate for SEO speed
  const res = await fetch(`${baseUrl}/packages/${id}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.package ?? data;
}

// 1. DYNAMIC SEO: Fixed signature to receive params correctly
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pkg = await getPackageData(id);

  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.name} | Mikumi Safari's`,
    description: pkg.description?.substring(0, 160) || "Explore our exclusive safari packages.",
    openGraph: {
      title: pkg.name,
      description: pkg.description?.substring(0, 160),
      images: [
        {
          url: pkg.image_url,
          width: 1200,
          height: 630,
          alt: pkg.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.name,
      description: pkg.description?.substring(0, 160),
      images: [pkg.image_url],
    },
  };
}

// 2. SERVER COMPONENT
export default async function Page({ params }: Props) {
  const { id } = await params;

  // Parallel fetching to speed up page load
  const [pkg, relatedData] = await Promise.all([
    getPackageData(id),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`, { next: { revalidate: 3600 } }).then(res => res.json())
  ]);

  if (!pkg) notFound();

  // Normalize related packages data
  const allRelated = relatedData.packages?.data || relatedData.packages || relatedData || [];

  return (
      <PackageClientView
          initialPackage={pkg}
          initialRelated={allRelated}
      />
  );
}
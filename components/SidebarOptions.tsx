"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

interface SidebarOptionsProps {
  href: string;
  id: string;
}

export default function SidebarOptions(props: SidebarOptionsProps) {
  const [data, loading, error] = useDocumentData(
    doc(db, "documents", props.id)
  );
  const pathname = usePathname();
  const isActive = props.href.includes(pathname) && pathname !== "/";

  if (!data) return null;
  return (
    <Link
      href={props.href}
      className={`border p-2 rounded-md 
    ${isActive ? "bg-gray-300 font-bold border-gray-400" : "border-gray-400"}`}
    >
      <p className="truncate">{data.title}</p>
    </Link>
  );
}

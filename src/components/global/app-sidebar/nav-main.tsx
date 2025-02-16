"use client"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { data } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavMain = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
    const pathname = usePathname();
  return <SidebarGroup>
    <SidebarMenu>
        {data.navMain.map((item)=>{
            return <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
                asChild
                tooltip={item.title}
                className={`${pathname.includes(item.url)&& 'bg-muted'}`}
            >
                <Link href={item.url} className={`text-lg ${
                    pathname.includes(item.url) && 'font-bold'
                }`}>
                    <item.icon className="text-lg"/>
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        })}
    </SidebarMenu>
  </SidebarGroup>;
};

export default NavMain;

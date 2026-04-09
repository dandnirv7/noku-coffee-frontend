"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Share2 } from "lucide-react";

interface SocialShareProps {
  url: string;
  text?: string;
}

export function SocialShare({ url, text = "" }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const waText = text ? `${encodedText}%20${encodedUrl}` : encodedUrl;

  const shareLinks = [
    {
      label: "Facebook",
      icon: <IconBrandFacebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Twitter",
      icon: <IconBrandTwitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}${text ? `&text=${encodedText}` : ""}`,
    },
    {
      label: "Instagram",
      icon: <IconBrandInstagram className="w-4 h-4" />,
      href: `https://www.instagram.com/share?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: <IconBrandWhatsapp className="w-4 h-4" />,
      href: `https://wa.me/?text=${waText}`,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Bagikan
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {shareLinks.map((link) => (
          <DropdownMenuItem
            key={link.label}
            asChild
            className="gap-2 cursor-pointer"
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
              {link.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

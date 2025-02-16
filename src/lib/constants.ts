import { Home, LayoutTemplate, Settings, Trash } from "lucide-react";

export const data = {
    user: {
        name: 'shadcn',
        email: 'test@example.com',
        avatar: 'https://example.com/avatar.jpg'
    },
    navMain:[
        {
            title: 'Home',
            url: '/dashboard',
            icon: Home
        },
        {
            title: 'Templates',
            url: '/templates',
            icon: LayoutTemplate,
        },
        {
            title: 'Trash',
            url: '/trash',
            icon: Trash,
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
        },
    ]
}
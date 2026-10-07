import type { Event } from "@/types";

export const events: Event[] = [
  {
    id: "robocon",
    slug: "robocon",
    name: "ABU Robocon",
    shortName: "ROBOCON",
    tagline: "Asia's largest robotics competition",
    description:
      "ABU Robocon is Asia-Pacific's flagship robotics competition organized by the Asia-Pacific Broadcasting Union. Teams design and build automated and manual robots to complete a theme-based challenge that changes every year. NRC has been a consistent participant, representing NUST at the national qualifier and international stage.",
    coverImage: "/images/events/robocon-cover.jpg",
    category: "competition",
    editions: [
      {
        year: 2026,
        description:
          "Replace with official 2026 Robocon edition description. Include the year's theme and NRC's approach.",
        stats: [
          { label: "Team Size", value: "24", unit: "members" },
          { label: "Robots Built", value: "2", unit: "units" },
          { label: "Development Weeks", value: "18", unit: "weeks" },
          { label: "National Ranking", value: "Replace", unit: "" },
        ],
        results: [
          {
            rank: 1,
            team: "NRC Core Team",
            members: ["Replace with team members"],
            achievement: "Replace with actual result",
          },
        ],
        media: [
          {
            type: "image",
            url: "/images/events/robocon-2026-1.jpg",
            caption: "Replace with actual media",
          },
        ],
        coverImage: "/images/events/robocon-2026-cover.jpg",
      },
      {
        year: 2025,
        description:
          "Replace with official 2025 Robocon edition description.",
        stats: [
          { label: "Team Size", value: "22", unit: "members" },
          { label: "Robots Built", value: "2", unit: "units" },
          { label: "Development Weeks", value: "16", unit: "weeks" },
          { label: "National Ranking", value: "Replace", unit: "" },
        ],
        results: [
          {
            rank: 1,
            team: "NRC Core Team",
            members: ["Replace with team members"],
            achievement: "Replace with actual result",
          },
        ],
        media: [],
        coverImage: "/images/events/robocon-2025-cover.jpg",
      },
    ],
  },

  {
    id: "workshops",
    slug: "workshops",
    name: "Workshops",
    shortName: "WORKSHOPS",
    tagline: "Hands-on technical training",
    description:
      "NRC conducts technical workshops throughout the year covering robotics fundamentals, embedded systems, computer vision, ROS, and more. Open to NUST students at all skill levels.",
    coverImage: "/images/events/workshops-cover.jpg",
    category: "workshop",
    editions: [
      {
        year: 2026,
        description: "Replace with 2026 workshop series description.",
        stats: [
          { label: "Workshops Held", value: "8", unit: "sessions" },
          { label: "Participants", value: "200+", unit: "students" },
          { label: "Topics Covered", value: "6", unit: "domains" },
          { label: "Hours of Training", value: "40+", unit: "hours" },
        ],
        results: [],
        media: [],
        coverImage: "/images/events/workshops-2026-cover.jpg",
      },
    ],
  },
  {
    id: "speed-demons",
    slug: "speed-demons",
    name: "Speed Demons",
    shortName: "SPEED DEMONS",
    tagline: "NRC's internal line-follower championship",
    description:
      "Speed Demons is NRC's flagship internal competition where members build autonomous line-following robots to race against each other. The event serves as a proving ground for new members and a benchmark for experienced builders.",
    coverImage: "/images/events/speed-demons-cover.jpg",
    category: "internal",
    editions: [
      {
        year: 2026,
        description: "Replace with 2026 Speed Demons edition description.",
        stats: [
          { label: "Participants", value: "30+", unit: "members" },
          { label: "Robots", value: "15+", unit: "builds" },
          { label: "Best Lap Time", value: "Replace", unit: "seconds" },
          { label: "Rounds", value: "3", unit: "rounds" },
        ],
        results: [
          {
            rank: 1,
            team: "Replace with winner",
            achievement: "Champion",
          },
          {
            rank: 2,
            team: "Replace with runner-up",
            achievement: "Runner-up",
          },
          {
            rank: 3,
            team: "Replace with third place",
            achievement: "Third Place",
          },
        ],
        media: [],
        coverImage: "/images/events/speed-demons-2026-cover.jpg",
      },
    ],
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEditionByYear(
  event: Event,
  year: number
): Event["editions"][0] | undefined {
  return event.editions.find((e) => e.year === year);
}

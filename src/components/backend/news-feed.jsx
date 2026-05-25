import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewsFeed() {
  const news = [
    { type: "New Order", time: "11:00 AM" },
    { type: "New Customer", time: "11:00 AM" },
    { type: "New Order", time: "11:00 AM" },
    { type: "New Order", time: "11:00 AM" },
    { type: "New Order", time: "11:00 AM" },
    { type: "New Order", time: "11:00 AM" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>News Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{item.type}</span>
              <span className="text-gray-500 text-sm">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


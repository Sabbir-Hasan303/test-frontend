import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-800 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231</div>
          <p className="text-xs text-green-500">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customers Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">231</div>
          <p className="text-xs text-green-500">+2.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231</div>
          <p className="text-xs text-green-500">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">231</div>
          <p className="text-xs text-green-500">+2.1% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}


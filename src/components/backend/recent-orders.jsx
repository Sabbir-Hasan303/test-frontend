import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const orders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    orderDate: "12/12/2021",
    deliveryDate: "12/12/2021",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered"
  },
  {
    id: "ORD002",
    customerName: "Jane Doe",
    orderDate: "12/12/2021",
    deliveryDate: "12/12/2021",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered"
  },
  {
    id: "ORD003",
    customerName: "John Doe",
    orderDate: "12/12/2021",
    deliveryDate: "12/12/2021",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered"
  },
  {
    id: "ORD004",
    customerName: "Jane Doe",
    orderDate: "12/12/2021",
    deliveryDate: "12/12/2021",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered"
  }
]

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ORDER ID</TableHead>
              <TableHead>CUSTOMER NAME</TableHead>
              <TableHead>ORDER DATE</TableHead>
              <TableHead>DELIVERY DATE</TableHead>
              <TableHead>PAYMENT STATUS</TableHead>
              <TableHead>DELIVERY STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.deliveryDate}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.deliveryStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="bg-black text-white">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const products = [
  {
    id: "P001",
    name: "Chicken Nuggets",
    weight: "1kg",
    totalSold: "100",
    totalRevenue: "1000",
  },
]

export function TopSellingProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PRODUCT ID</TableHead>
              <TableHead>PRODUCT NAME</TableHead>
              <TableHead>WEIGHT</TableHead>
              <TableHead>TOTAL SOLD</TableHead>
              <TableHead>TOTAL REVENUE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.totalSold}</TableCell>
                <TableCell>${product.totalRevenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


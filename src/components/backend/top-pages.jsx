import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pages = [
  { path: "/dashboard", views: "231", exitRatio: "20%" },
  { path: "/products", views: "232", exitRatio: "25%" },
  { path: "/orders", views: "233", exitRatio: "30%" },
  { path: "/customers", views: "234", exitRatio: "25%" },
  { path: "/settings", views: "235", exitRatio: "20%" },
  { path: "/profile", views: "236", exitRatio: "15%" },
]

export function TopPages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PAGE PATH</TableHead>
              <TableHead>PAGE VIEWS</TableHead>
              <TableHead>EXIT RATIO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.path}>
                <TableCell>{page.path}</TableCell>
                <TableCell>{page.views}</TableCell>
                <TableCell>{page.exitRatio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


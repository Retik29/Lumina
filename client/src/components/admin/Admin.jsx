import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Users, MessageCircle, Calendar, ArrowUpRight } from "lucide-react"

export default function AdminComponent() {
    const stats = [
        { icon: Users, label: "Active Users", value: "1,234", color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: MessageCircle, label: "Chat Sessions", value: "5,678", color: "text-purple-500", bg: "bg-purple-500/10" },
        { icon: Calendar, label: "Counseling Requests", value: "89", color: "text-pink-500", bg: "bg-pink-500/10" },
        { icon: BarChart3, label: "Resources Accessed", value: "2,345", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    ]

    const requests = [
        { id: 1, name: "Student A", date: "2024-11-27", status: "Pending", type: "Anxiety" },
        { id: 2, name: "Student B", date: "2024-11-26", status: "Assigned", type: "Depression" },
        { id: 3, name: "Student C", date: "2024-11-25", status: "Completed", type: "General" },
        { id: 4, name: "Student D", date: "2024-11-24", status: "Pending", type: "Stress" },
    ]

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <Card key={i} className="p-6 border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            <Card className="border-border bg-card/50 backdrop-blur overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center">
                    <h2 className="text-xl font-bold text-foreground">Recent Counseling Requests</h2>
                    <Button variant="outline" size="sm" className="gap-2">
                        View All <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-border">
                                <TableHead className="text-muted-foreground">Student</TableHead>
                                <TableHead className="text-muted-foreground">Date Requested</TableHead>
                                <TableHead className="text-muted-foreground">Type</TableHead>
                                <TableHead className="text-muted-foreground">Status</TableHead>
                                <TableHead className="text-muted-foreground">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req) => (
                                <TableRow key={req.id} className="border-border hover:bg-muted/50">
                                    <TableCell className="font-medium text-foreground">{req.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{req.date}</TableCell>
                                    <TableCell className="text-muted-foreground">{req.type}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === "Pending"
                                                    ? "bg-yellow-500/10 text-yellow-500"
                                                    : req.status === "Assigned"
                                                        ? "bg-blue-500/10 text-blue-500"
                                                        : "bg-green-500/10 text-green-500"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="outline" className="h-8 border-primary/20 hover:bg-primary/10 hover:text-primary">
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

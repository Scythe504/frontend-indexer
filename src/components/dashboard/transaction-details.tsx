"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Copy, ChevronDown, ChevronRight } from "lucide-react"

// Sample transaction data based on the provided JSON
const sampleTransaction = {
    "accountData": [
        {
            "account": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
            "nativeBalanceChange": -867779969,
            "tokenBalanceChanges": []
        },
        {
            "account": "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "95KoBwK7xLH3Uup1sN4Pv2rXpVCxjwh43Um1ZFuHzPEe",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "Gv7Sk9BSUCkeAfxDgQzh6sJ5s8R4UoncfTgGyQ567pRS",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": [
                {
                    "mint": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
                    "rawTokenAmount": {
                        "decimals": 6,
                        "tokenAmount": "-85000000"
                    },
                    "tokenAccount": "Gv7Sk9BSUCkeAfxDgQzh6sJ5s8R4UoncfTgGyQ567pRS",
                    "userAccount": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM"
                }
            ]
        },
        {
            "account": "DLZSeiq2xjikgwcniQB6B89uodkbQHrTcco6mJu9UNuK",
            "nativeBalanceChange": 867756255,
            "tokenBalanceChanges": [
                {
                    "mint": "So11111111111111111111111111111111111111112",
                    "rawTokenAmount": {
                        "decimals": 9,
                        "tokenAmount": "867756255"
                    },
                    "tokenAccount": "DLZSeiq2xjikgwcniQB6B89uodkbQHrTcco6mJu9UNuK",
                    "userAccount": "Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG"
                }
            ]
        },
        {
            "account": "F25nyBGmRtMYBC7hw7kqmHWzCkwCzBBGWGpzdg8rHxXV",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": [
                {
                    "mint": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
                    "rawTokenAmount": {
                        "decimals": 6,
                        "tokenAmount": "85000000"
                    },
                    "tokenAccount": "F25nyBGmRtMYBC7hw7kqmHWzCkwCzBBGWGpzdg8rHxXV",
                    "userAccount": "Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG"
                }
            ]
        },
        {
            "account": "Gg7GCTQ2NzxH31jM8SdXvMqrdDfghL6pjhxJHzarue6Q",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "ComputeBudget111111111111111111111111111111",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "11111111111111111111111111111111",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "CbBVtW4hQdipJ8aSGgw2URrC11vNCc9Gw7U37c7nH4uu",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY",
            "nativeBalanceChange": 10000,
            "tokenBalanceChanges": []
        },
        {
            "account": "So11111111111111111111111111111111111111112",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        },
        {
            "account": "SysvarRent111111111111111111111111111111111",
            "nativeBalanceChange": 0,
            "tokenBalanceChanges": []
        }
    ],
    "description": "",
    "events": {},
    "fee": 13714,
    "feePayer": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
    "instructions": [
        {
            "accounts": [],
            "data": "F9Ezjq",
            "innerInstructions": [],
            "programId": "ComputeBudget111111111111111111111111111111"
        },
        {
            "accounts": [],
            "data": "3hnkUenoJeZd",
            "innerInstructions": [],
            "programId": "ComputeBudget111111111111111111111111111111"
        },
        {
            "accounts": [
                "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
                "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY"
            ],
            "data": "3Bxs43ZMjSRQLs6o",
            "innerInstructions": [],
            "programId": "11111111111111111111111111111111"
        },
        {
            "accounts": [
                "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
                "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ"
            ],
            "data": "11116ueEX4GZiXB2fucMmVbNHowsEqAdeBku9a83afzSSHkr6GknS1KSBm5yv4EMsDrLNL",
            "innerInstructions": [],
            "programId": "11111111111111111111111111111111"
        },
        {
            "accounts": [
                "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
                "So11111111111111111111111111111111111111112",
                "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
                "SysvarRent111111111111111111111111111111111"
            ],
            "data": "2",
            "innerInstructions": [],
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
            "accounts": [
                "Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG",
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
                "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
                "95KoBwK7xLH3Uup1sN4Pv2rXpVCxjwh43Um1ZFuHzPEe",
                "CbBVtW4hQdipJ8aSGgw2URrC11vNCc9Gw7U37c7nH4uu",
                "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
                "Gv7Sk9BSUCkeAfxDgQzh6sJ5s8R4UoncfTgGyQ567pRS",
                "DLZSeiq2xjikgwcniQB6B89uodkbQHrTcco6mJu9UNuK",
                "F25nyBGmRtMYBC7hw7kqmHWzCkwCzBBGWGpzdg8rHxXV",
                "Gg7GCTQ2NzxH31jM8SdXvMqrdDfghL6pjhxJHzarue6Q",
                "Gg7GCTQ2NzxH31jM8SdXvMqrdDfghL6pjhxJHzarue6Q"
            ],
            "data": "3KLKPPgnNhbUVEDj8BJNUs7Y1gXDhL1ENN8RVakmwLfkUSDCuR6aLwZ",
            "innerInstructions": [
                {
                    "accounts": [
                        "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
                        "DLZSeiq2xjikgwcniQB6B89uodkbQHrTcco6mJu9UNuK",
                        "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM"
                    ],
                    "data": "3rum6zyUq38s",
                    "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "accounts": [
                        "Gv7Sk9BSUCkeAfxDgQzh6sJ5s8R4UoncfTgGyQ567pRS",
                        "F25nyBGmRtMYBC7hw7kqmHWzCkwCzBBGWGpzdg8rHxXV",
                        "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM"
                    ],
                    "data": "3QL7G6E7wcsH",
                    "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "programId": "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"
        },
        {
            "accounts": [
                "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
                "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
                "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM"
            ],
            "data": "A",
            "innerInstructions": [],
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
    ],
    "nativeTransfers": [
        {
            "amount": 10000,
            "fromUserAccount": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
            "toUserAccount": "Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY"
        },
        {
            "amount": 891489441,
            "fromUserAccount": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
            "toUserAccount": "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ"
        },
        {
            "amount": 23733186,
            "fromUserAccount": "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
            "toUserAccount": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM"
        }
    ],
    "signature": "57dJxwuDZ3cbaC9wbndZWgwso1jyLXnrJCHcZNpsFmHjfoGchrSG2GaSNaYEt3jBcq8veydb1ENevujLiTePjQpU",
    "slot": 328888130,
    "source": "ORCA",
    "timestamp": 1742828327,
    "tokenTransfers": [
        {
            "fromTokenAccount": "Ckab1SBzSaGTVhFs1hzNPrhZwQNeuyJXYx99ny6VguhQ",
            "fromUserAccount": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
            "mint": "So11111111111111111111111111111111111111112",
            "toTokenAccount": "DLZSeiq2xjikgwcniQB6B89uodkbQHrTcco6mJu9UNuK",
            "toUserAccount": "Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG",
            "tokenAmount": 0.867756255,
            "tokenStandard": "Fungible"
        },
        {
            "fromTokenAccount": "Gv7Sk9BSUCkeAfxDgQzh6sJ5s8R4UoncfTgGyQ567pRS",
            "fromUserAccount": "4NQ5GL3RzGtxYXpcTGAptLCzeZ8xxweanc9dVHrzTEJM",
            "mint": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
            "toTokenAccount": "F25nyBGmRtMYBC7hw7kqmHWzCkwCzBBGWGpzdg8rHxXV",
            "toUserAccount": "Hxw77h9fEx598afiiZunwHaX3vYu9UskDk9EpPNZp1mG",
            "tokenAmount": 85,
            "tokenStandard": "Fungible"
        }
    ],
    "transactionError": null,
    "type": "INCREASE_LIQUIDITY"
}

export function TransactionDetails() {
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        tokenTransfers: true,
        accountData: false,
        instructions: false,
    })

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleString()
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        // You could add a toast notification here
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <CardTitle>Transaction Explorer</CardTitle>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by signature..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Signature</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-sm font-mono truncate">{sampleTransaction.signature}</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => copyToClipboard(sampleTransaction.signature)}
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Timestamp</h3>
                                        <p className="text-sm">{formatTimestamp(sampleTransaction.timestamp)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Fee</h3>
                                        <p className="text-sm">{sampleTransaction.fee} lamports</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Block</h3>
                                        <p className="text-sm">{sampleTransaction.slot}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Fee Payer</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-sm font-mono truncate">{sampleTransaction.feePayer}</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => copyToClipboard(sampleTransaction.feePayer)}
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                                                {sampleTransaction.type}
                                            </Badge>
                                            <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                                                {sampleTransaction.source}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-lg border">
                                <button
                                    className="flex items-center justify-between w-full p-4 text-left"
                                    onClick={() => toggleSection("tokenTransfers")}
                                >
                                    <h3 className="text-sm font-medium">Token Transfers</h3>
                                    {expandedSections.tokenTransfers ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>
                                {expandedSections.tokenTransfers && (
                                    <div className="p-4 pt-0 border-t">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left p-2 text-xs font-medium text-muted-foreground">Token</th>
                                                        <th className="text-left p-2 text-xs font-medium text-muted-foreground">From</th>
                                                        <th className="text-left p-2 text-xs font-medium text-muted-foreground">To</th>
                                                        <th className="text-right p-2 text-xs font-medium text-muted-foreground">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sampleTransaction.tokenTransfers.map((transfer, index) => (
                                                        <tr key={index} className="border-b last:border-0">
                                                            <td className="p-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                                                        {transfer.mint.substring(0, 2)}
                                                                    </div>
                                                                    <span className="font-medium">
                                                                        {transfer.mint.substring(0, 4)}...
                                                                        {transfer.mint.substring(transfer.mint.length - 4)}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 font-mono text-xs">
                                                                {transfer.fromUserAccount.substring(0, 4)}...
                                                                {transfer.fromUserAccount.substring(transfer.fromUserAccount.length - 4)}
                                                            </td>
                                                            <td className="p-2 font-mono text-xs">
                                                                {transfer.toUserAccount.substring(0, 4)}...
                                                                {transfer.toUserAccount.substring(transfer.toUserAccount.length - 4)}
                                                            </td>
                                                            <td className="p-2 text-right">{transfer.tokenAmount}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-lg border">
                                <button
                                    className="flex items-center justify-between w-full p-4 text-left"
                                    onClick={() => toggleSection("accountData")}
                                >
                                    <h3 className="text-sm font-medium">Account Changes</h3>
                                    {expandedSections.accountData ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>
                                {expandedSections.accountData && (
                                    <div className="p-4 pt-0 border-t">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="text-left p-2 text-xs font-medium text-muted-foreground">Account</th>
                                                        <th className="text-right p-2 text-xs font-medium text-muted-foreground">SOL Change</th>
                                                        <th className="text-left p-2 text-xs font-medium text-muted-foreground">Token Changes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sampleTransaction.accountData.map((account, index) => (
                                                        <tr key={index} className="border-b last:border-0">
                                                            <td className="p-2 font-mono text-xs">
                                                                {account.account.substring(0, 4)}...
                                                                {account.account.substring(account.account.length - 4)}
                                                            </td>
                                                            <td
                                                                className={`p-2 text-right ${account.nativeBalanceChange > 0 ? "text-green-600" : account.nativeBalanceChange < 0 ? "text-red-600" : ""}`}
                                                            >
                                                                {account.nativeBalanceChange !== 0
                                                                    ? (account.nativeBalanceChange / 1000000000).toFixed(9)
                                                                    : "-"}
                                                            </td>
                                                            <td className="p-2">
                                                                {account.tokenBalanceChanges.length > 0 ? (
                                                                    <div className="space-y-1">
                                                                        {account.tokenBalanceChanges.map((change, idx) => (
                                                                            <div key={idx} className="flex items-center gap-2">
                                                                                <span className="font-mono text-xs">{change.mint.substring(0, 4)}...</span>
                                                                                <span
                                                                                    className={`text-xs ${Number(change.rawTokenAmount.tokenAmount) > 0 ? "text-green-600" : "text-red-600"}`}
                                                                                >
                                                                                    {(
                                                                                        Number(change.rawTokenAmount.tokenAmount) /
                                                                                        Math.pow(10, change.rawTokenAmount.decimals)
                                                                                    ).toFixed(change.rawTokenAmount.decimals)}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    "-"
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-lg border">
                                <button
                                    className="flex items-center justify-between w-full p-4 text-left"
                                    onClick={() => toggleSection("instructions")}
                                >
                                    <h3 className="text-sm font-medium">Instructions</h3>
                                    {expandedSections.instructions ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>
                                {expandedSections.instructions && (
                                    <div className="p-4 pt-0 border-t">
                                        <p className="text-sm text-muted-foreground">
                                            This transaction contains multiple instructions including compute budget settings and token
                                            transfers.
                                        </p>
                                        <Button variant="link" className="p-0 h-auto text-sm" asChild>
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                View detailed instructions <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowDownUp, Clock, FileText, Wallet } from "lucide-react"

export default function TokenTransactionPage() {
  const [transactionData] = useState({
    "accountData": [
      {
        "account": "5JPAWfhLNsYVk3tPpD3gHvpHbvaXDbpUpy1wUfQVYRS2",
        "nativeBalanceChange": -14000,
        "tokenBalanceChanges": []
      },
      {
        "account": "2NW7G6ykHGzExi9t9gsWuiZKLaYitbAofagq4wV2P8rn",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      },
      {
        "account": "3ZAEpsm7rwP3nLkf7ttXcapfV3biiEUBBqVdwbydHKrW",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": [
          {
            "mint": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
            "rawTokenAmount": {
              "decimals": 6,
              "tokenAmount": "-15052625735"
            },
            "tokenAccount": "3ZAEpsm7rwP3nLkf7ttXcapfV3biiEUBBqVdwbydHKrW",
            "userAccount": "2NW7G6ykHGzExi9t9gsWuiZKLaYitbAofagq4wV2P8rn"
          }
        ]
      },
      {
        "account": "BwzWKw33iBQin9E8HwFgevCeMByioZCvoZFk7uN433ft",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": [
          {
            "mint": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
            "rawTokenAmount": {
              "decimals": 6,
              "tokenAmount": "15052625735"
            },
            "tokenAccount": "BwzWKw33iBQin9E8HwFgevCeMByioZCvoZFk7uN433ft",
            "userAccount": "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9"
          }
        ]
      },
      {
        "account": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      },
      {
        "account": "ComputeBudget111111111111111111111111111111",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      },
      {
        "account": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "nativeBalanceChange": 0,
        "tokenBalanceChanges": []
      }
    ],
    "description": "2NW7G6ykHGzExi9t9gsWuiZKLaYitbAofagq4wV2P8rn transferred 15052.625735 ORCA to 5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9.",
    "events": {},
    "fee": 14000,
    "feePayer": "5JPAWfhLNsYVk3tPpD3gHvpHbvaXDbpUpy1wUfQVYRS2",
    "instructions": [
      {
        "accounts": [],
        "data": "3QAwFKa3MJAs",
        "innerInstructions": [],
        "programId": "ComputeBudget111111111111111111111111111111"
      },
      {
        "accounts": [],
        "data": "EuxTsD",
        "innerInstructions": [],
        "programId": "ComputeBudget111111111111111111111111111111"
      },
      {
        "accounts": [
          "3ZAEpsm7rwP3nLkf7ttXcapfV3biiEUBBqVdwbydHKrW",
          "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
          "BwzWKw33iBQin9E8HwFgevCeMByioZCvoZFk7uN433ft",
          "2NW7G6ykHGzExi9t9gsWuiZKLaYitbAofagq4wV2P8rn"
        ],
        "data": "h1z8FcSsWQ5mP",
        "innerInstructions": [],
        "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
      }
    ],
    "nativeTransfers": [],
    "signature": "2qW6ZV4hzdskTtuwvT5GrwdLEbGTXknf1b6cwbRhqguBXcW9iScL4BFAcfZZJ8FaBrzRgHtDMh3LM6xkWcvfWSFM",
    "slot": 328893328,
    "source": "SOLANA_PROGRAM_LIBRARY",
    "timestamp": 1742830398,
    "tokenTransfers": [
      {
        "fromTokenAccount": "3ZAEpsm7rwP3nLkf7ttXcapfV3biiEUBBqVdwbydHKrW",
        "fromUserAccount": "2NW7G6ykHGzExi9t9gsWuiZKLaYitbAofagq4wV2P8rn",
        "mint": "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE",
        "toTokenAccount": "BwzWKw33iBQin9E8HwFgevCeMByioZCvoZFk7uN433ft",
        "toUserAccount": "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9",
        "tokenAmount": 15052.625735,
        "tokenStandard": "Fungible"
      }
    ],
    "transactionError": null,
    "type": "TRANSFER"
  }
  )

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  // Format account address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Format SOL amount (convert lamports to SOL)
  const formatSolAmount = (lamports: number) => {
    const sol = lamports / 1000000000
    return sol.toLocaleString(undefined, { minimumFractionDigits: 9, maximumFractionDigits: 9 })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Token Transaction Details</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5" />
            Transaction Overview
          </CardTitle>
          <CardDescription>{transactionData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-24">Signature:</span>
                <span className="text-sm break-all">{transactionData.signature}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-24">Type:</span>
                <Badge variant="outline">{transactionData.type}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-24">Fee:</span>
                <span>{formatSolAmount(transactionData.fee)} SOL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-24">Fee Payer:</span>
                <span className="text-sm font-mono">{formatAddress(transactionData.feePayer)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-24">Slot:</span>
                <span>{transactionData.slot.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-24">Time:</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDate(transactionData.timestamp)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-24">Source:</span>
                <span>{transactionData.source}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="token-transfers" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="token-transfers">Token Transfers</TabsTrigger>
          <TabsTrigger value="account-changes">Account Changes</TabsTrigger>
        </TabsList>

        <TabsContent value="token-transfers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Token Transfers
              </CardTitle>
              <CardDescription>Details of all token transfers in this transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {transactionData.tokenTransfers.map((transfer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center gap-2 mb-2 md:mb-0">
                        <Badge variant={transfer.tokenAmount > 0 ? "secondary" : "default"}>
                          {transfer.tokenStandard}
                        </Badge>
                        <span className="font-medium">{transfer.tokenAmount.toLocaleString()} tokens</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Mint: <span className="font-mono">{formatAddress(transfer.mint)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">From</div>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            User: <span className="font-mono">{formatAddress(transfer.fromUserAccount)}</span>
                          </span>
                          <span className="text-sm">
                            Token Account: <span className="font-mono">{formatAddress(transfer.fromTokenAccount)}</span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">To</div>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            User: <span className="font-mono">{formatAddress(transfer.toUserAccount)}</span>
                          </span>
                          <span className="text-sm">
                            Token Account: <span className="font-mono">{formatAddress(transfer.toTokenAccount)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account-changes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Account Balance Changes
              </CardTitle>
              <CardDescription>Native and token balance changes for all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactionData.accountData
                  .filter((account) => account.nativeBalanceChange !== 0 || account.tokenBalanceChanges.length > 0)
                  .map((account, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="font-medium mb-2">
                        Account: <span className="font-mono">{formatAddress(account.account)}</span>
                      </div>

                      {account.nativeBalanceChange !== 0 && (
                        <div className="mb-3">
                          <div className="text-sm text-muted-foreground mb-1">Native Balance Change:</div>
                          <div
                            className={`font-medium ${account.nativeBalanceChange > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {account.nativeBalanceChange > 0 ? "+" : ""}
                            {formatSolAmount(account.nativeBalanceChange)} SOL
                          </div>
                        </div>
                      )}

                      {account.tokenBalanceChanges.length > 0 && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Token Balance Changes:</div>
                          <div className="space-y-2">
                            {account.tokenBalanceChanges.map((change, idx) => {
                              const amount =
                                Number.parseInt(change.rawTokenAmount.tokenAmount) /
                                Math.pow(10, change.rawTokenAmount.decimals)
                              return (
                                <div key={idx} className="pl-2 border-l-2 border-muted-foreground">
                                  <div className="flex flex-col">
                                    <span className="text-sm">
                                      Mint: <span className="font-mono">{formatAddress(change.mint)}</span>
                                    </span>
                                    <span className={`font-medium ${amount > 0 ? "text-green-500" : "text-red-500"}`}>
                                      {amount > 0 ? "+" : ""}
                                      {amount.toLocaleString()} tokens
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


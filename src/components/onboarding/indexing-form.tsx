"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Info, Webhook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/onboarding/multi-select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Transaction types enum
const transactionTypes = [
  "UNKNOWN",
  "NFT_BID",
  "NFT_BID_CANCELLED",
  "NFT_LISTING",
  "NFT_CANCEL_LISTING",
  "NFT_SALE",
  "NFT_MINT",
  "NFT_AUCTION_CREATED",
  "NFT_AUCTION_UPDATED",
  "NFT_AUCTION_CANCELLED",
  "NFT_PARTICIPATION_REWARD",
  "NFT_MINT_REJECTED",
  "CREATE_STORE",
  "WHITELIST_CREATOR",
  "ADD_TO_WHITELIST",
  "REMOVE_FROM_WHITELIST",
  "AUCTION_MANAGER_CLAIM_BID",
  "EMPTY_PAYMENT_ACCOUNT",
  "UPDATE_PRIMARY_SALE_METADATA",
  "ADD_TOKEN_TO_VAULT",
  "ACTIVATE_VAULT",
  "INIT_VAULT",
  "INIT_BANK",
  "INIT_STAKE",
  "MERGE_STAKE",
  "SPLIT_STAKE",
  "SET_BANK_FLAGS",
  "SET_VAULT_LOCK",
  "UPDATE_VAULT_OWNER",
  "UPDATE_BANK_MANAGER",
  "RECORD_RARITY_POINTS",
  "ADD_RARITIES_TO_BANK",
  "INIT_FARM",
  "INIT_FARMER",
  "REFRESH_FARMER",
  "UPDATE_FARM",
  "AUTHORIZE_FUNDER",
  "DEAUTHORIZE_FUNDER",
  "FUND_REWARD",
  "CANCEL_REWARD",
  "LOCK_REWARD",
  "PAYOUT",
  "VALIDATE_SAFETY_DEPOSIT_BOX_V2",
  "SET_AUTHORITY",
  "INIT_AUCTION_MANAGER_V2",
  "UPDATE_EXTERNAL_PRICE_ACCOUNT",
  "AUCTION_HOUSE_CREATE",
  "CLOSE_ESCROW_ACCOUNT",
  "WITHDRAW",
  "DEPOSIT",
  "TRANSFER",
  "BURN",
  "BURN_NFT",
  "PLATFORM_FEE",
  "LOAN",
  "RESCIND_LOAN",
  "OFFER_LOAN",
  "REPAY_LOAN",
  "TAKE_LOAN",
  "FORECLOSE_LOAN",
  "ADD_TO_POOL",
  "REMOVE_FROM_POOL",
  "CLOSE_POSITION",
  "UNLABELED",
  "CLOSE_ACCOUNT",
  "WITHDRAW_GEM",
  "DEPOSIT_GEM",
  "STAKE_TOKEN",
  "UNSTAKE_TOKEN",
  "STAKE_SOL",
  "UNSTAKE_SOL",
  "CLAIM_REWARDS",
  "BUY_SUBSCRIPTION",
  "SWAP",
  "INIT_SWAP",
  "CANCEL_SWAP",
  "REJECT_SWAP",
  "INITIALIZE_ACCOUNT",
  "TOKEN_MINT",
  "CREATE_APPARAISAL",
  "FUSE",
  "DEPOSIT_FRACTIONAL_POOL",
  "FRACTIONALIZE",
  "CREATE_RAFFLE",
  "BUY_TICKETS",
  "UPDATE_ITEM",
  "LIST_ITEM",
  "DELIST_ITEM",
  "ADD_ITEM",
  "CLOSE_ITEM",
  "BUY_ITEM",
  "FILL_ORDER",
  "UPDATE_ORDER",
  "CREATE_ORDER",
  "CLOSE_ORDER",
  "CANCEL_ORDER",
  "KICK_ITEM",
  "UPGRADE_FOX",
  "UPGRADE_FOX_REQUEST",
  "LOAN_FOX",
  "BORROW_FOX",
  "SWITCH_FOX_REQUEST",
  "SWITCH_FOX",
  "CREATE_ESCROW",
  "ACCEPT_REQUEST_ARTIST",
  "CANCEL_ESCROW",
  "ACCEPT_ESCROW_ARTIST",
  "ACCEPT_ESCROW_USER",
  "PLACE_BET",
  "PLACE_SOL_BET",
  "CREATE_BET",
  "NFT_RENT_UPDATE_LISTING",
  "NFT_RENT_ACTIVATE",
  "NFT_RENT_CANCEL_LISTING",
  "NFT_RENT_LISTING",
  "FINALIZE_PROGRAM_INSTRUCTION",
  "UPGRADE_PROGRAM_INSTRUCTION",
  "NFT_GLOBAL_BID",
  "NFT_GLOBAL_BID_CANCELLED",
  "EXECUTE_TRANSACTION",
  "APPROVE_TRANSACTION",
  "ACTIVATE_TRANSACTION",
  "CREATE_TRANSACTION",
  "REJECT_TRANSACTION",
  "CANCEL_TRANSACTION",
  "ADD_INSTRUCTION",
  "ATTACH_METADATA",
]

const formSchema = z.object({
  address: z.string().optional(),
  transactionTypes: z.array(z.string()).min(1, { message: "Please select at least one transaction type" }),
})

type FormValues = z.infer<typeof formSchema>

export function WebhookForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      transactionTypes: [],
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      console.log("Webhook values:", values)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/onboarding/complete")
    } catch (error) {
      console.error("Webhook error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-lg">
      <div className="flex items-center gap-2 border-b p-6">
        <Webhook className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Transaction Monitoring</h2>
      </div>

      <CardContent className="p-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Configure which transactions you want to monitor and optionally specify a Solana address to track.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Account Address</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Optional Solana address to monitor</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <Input placeholder="Solana address" {...field} />
                  </FormControl>
                  <FormDescription>Optional Solana address to monitor for transactions.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionTypes"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Transaction Type(s)</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select the type(s) of transactions to capture</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormControl>
                    <MultiSelect
                      placeholder="Select transaction types"
                      options={transactionTypes.map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      selected={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the type(s) of transactions to capture. Select "UNKNOWN" if interested in all transactions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button variant="outline" className="w-full" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}


"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FinanceType } from "@/types/financeTypes"
import { TableMenuOptions } from "@/components/tableMenuOptions"
import { ModalDeleteConfirmation } from "@/components/modalDeleteConfirmation"
import { useState } from "react"

export type HeaderType = {
    id: number
    accessorKey: string
    header: string
}

type Props = {
    columns: HeaderType[]
    data: FinanceType[]
    handleUpdateAll: any
}

export function DataTable({ columns, data, handleUpdateAll }: Props) {
    const [deleteId, setDeleteId] = useState()
    const [deleteModal, setDeleteModal] = useState(true)

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {
                            columns.map(item => (
                                <TableHead className="font-semibold text-neutral-50">
                                    {item.header}
                                </TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.length > 0 && data.map(item => (
                            <TableRow key={item.id} className="text-neutral-50">
                                <TableCell className="flex gap-2 items-center">
                                    <div>
                                        <img src={`/assets/icons/${item.standard_category}.png`} className="w-auto h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.transaction_desc}</div>
                                        <div className="text-xs">{item.standard_category}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="border rounded-full w-fit px-2">
                                        {item.standard_category === "Recebimento" ? " + " : " - "}
                                        € {item.transaction_value}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        {item.transaction_type}
                                    </div>
                                    <div className="text-xs">
                                        {item.fixed_expense === "fixed" ? "Fixo" : "Variável"}
                                    </div>

                                </TableCell>
                                <TableCell>
                                    {item.transaction_date}
                                </TableCell>
                                <TableCell>
                                    <TableMenuOptions
                                        id={item.id}
                                        setDeleteId={setDeleteId}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
            {data.length === 0 &&
                <div className="flex justify-center w-full text-neutral-50">
                    Nenhuma transação encontrada
                </div>
            }
            {deleteId != null &&
                <ModalDeleteConfirmation id={deleteId} handleUpdateAll={handleUpdateAll} setDeleteModal={setDeleteModal} setDeleteId={setDeleteId}/>
            }
        </div >
    )
}
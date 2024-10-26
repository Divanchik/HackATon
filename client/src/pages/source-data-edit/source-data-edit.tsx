import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {v4} from "uuid";

// TODO Вырезать mock data

import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Autocomplete,
    Box, Button, Modal, Switch,
    TableBody,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {useMemo, useState} from "react";

const mockData = [
    {
        fileName: "file 1",
        columns: [
            {
                columnName: "mockColumn1",
                columnValue: "mockValue1"
            },
            {
                columnName: "mockColumn2",
                columnValue: "mockValue2"
            },
            {
                columnName: "mockColumn3",
                columnValue: "mockValue3"
            },
        ],
    },
    {
        fileName: "file 2",
        columns: [
            {
                columnName: "mockColumn11",
                columnValue: "mockValue11"
            },
            {
                columnName: "mockColumn12",
                columnValue: "mockValue12"
            },
        ]
    }
];


export function SourceDataEdit() {
    const [cosntructorModal, setConstructorModal] = useState(false);

    const searchOption = useMemo(() => {
        const result: Array<string> = [];

        mockData.forEach((file) => {
            file.columns.forEach((column) => {
                result.push(`${file.fileName} ${column.columnName}`);
            })
        });
        console.log(result)
        return result.map((name) => ({id: v4(), label: name }));
    }, [])

    return (
        <div>
            <Box component="section" sx={{p: 2, bgcolor: "gray"}}>
                {mockData.map((file) =>
                    <Accordion slotProps={{heading: {component: 'h4'}}}>
                        <AccordionSummary
                            expandIcon={<ExpandLessIcon/>}
                            aria-controls="panel1-content"
                        >
                            {file.fileName}
                        </AccordionSummary>

                        <AccordionDetails>
                            <TableContainer>
                                {file.columns.map(column =>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        marginBottom: 10,
                                        padding: 10,
                                        borderBottom: "1px solid #ccc"
                                    }}>
                                        <TableHead>
                                            <TableRow/>
                                            <TableRow>
                                                {column.columnName}
                                            </TableRow>
                                            <TableRow/>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow/>
                                            <TableRow>
                                                {column.columnValue}
                                            </TableRow>
                                            <TableRow/>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow/>
                                            <TableRow>
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}>
                                                    <Button
                                                        onClick={() => {
                                                            setConstructorModal(true);
                                                        }}
                                                        variant="contained">{true ? "Редактировать/Удалить связь" : "Добавить связь"}</Button>
                                                    <CheckCircleOutlineIcon color="primary"/>
                                                    <CancelIcon color="warning"/>
                                                </div>
                                            </TableRow>
                                            <TableRow/>
                                        </TableBody>
                                    </div>
                                )}
                            </TableContainer>
                        </AccordionDetails>

                    </Accordion>
                )}
            </Box>
            <Modal
                open={cosntructorModal}
                onClose={() => {
                    setConstructorModal(false);
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"

            >
                <Box component="section" sx={{p: 2, bgcolor: "gray"}}>
                    <div>
                        {/*Тут информация о том, какие поля уже выбраны и какие операторы с ними используются. Также тут находится кнопка стереть все связи и поиск по типу связей, с якорями чтобы перейти к связе*/}
                        При добавлении хотябы одного связанного поля, появляется информация о связе
                        <Autocomplete
                            // TODO Тут посик по полям. формат при вводе и посказках (File 1: ColumnName1)
                            disablePortal
                            options={searchOption}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params} label="Movie"/>}
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
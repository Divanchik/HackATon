import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';
import { optionStore, parsedFileStore } from '../../store';
import { Section, SectionType } from '../../entities/options';
import { observer } from 'mobx-react-lite';

interface Props {
  ref?: any;
}

const Visual: FC<Props> = observer((props) => {
  const getSortedValues = (section: Section) => {
    const table = parsedFileStore.parsedFiles[section.content.choisenTable];
    const sortedValues: any[] = [];

    const max = Math.min(table.length, 5);

    for (let i = 0; i < max; i++) {
      // if (i === 4 && i + 1 < table.length) {
      //   const name = 'Другое';
      //   let value = 0;
      //   for (; i < table.length; i++) {
      //     const currentValue =
      //       table.columns[section.content.valueCol].columnValues[i];
      //     if (currentValue) {
      //       value += currentValue;
      //     }
      //   }
      //   sortedValues.push({ name, value });
      //   break;
      // } else {
      //   const name = table.columns[section.content.nameCol].columnValues[i];
      //   const currentValue =
      //     table.columns[section.content.valueCol].columnValues[i];
      //   const value = currentValue ? currentValue : 0;
      //   sortedValues.push({ name, value });
      // }

      const name = table.columns[section.content.nameCol].columnValues[i];
      const currentValue =
        table.columns[section.content.valueCol].columnValues[i];
      const value = currentValue ? currentValue : 0;
      sortedValues.push({ name, value });
    }

    sortedValues.sort((a, b) => b.value - a.value);

    const maxValue = sortedValues[0]?.value ? sortedValues[0]?.value : 0;

    return sortedValues.map((value) => ({ ...value, maxValue }));
  };

  const test = (text: any): string => {
    console.log(text);
    return '';
  };

  return (
    <Box
      ref={props.ref}
      component="section"
      sx={{ p: 2, width: 800, backgroundColor: 'white' }}
    >
      {optionStore.sections.map((section) => (
        <Box key={section.id} component="section" sx={{ p: 2 }}>
          {section.type === SectionType.TEXT ? (
            <div>
              <p
                style={{
                  whiteSpace: 'pre',
                }}
              >
                {section.content}
              </p>
            </div>
          ) : section.type === SectionType.TABLE ? (
            typeof section.content.choisenTable === 'number' ? (
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      {section.content.choisenCols.map((col: number) => (
                        <TableCell>
                          {
                            parsedFileStore.parsedFiles[
                              section.content.choisenTable
                            ].columns[col].columnName
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from(
                      Array(
                        parsedFileStore.parsedFiles[
                          section.content.choisenTable
                        ].length
                      ).keys()
                    ).map((i) => (
                      <TableRow>
                        {section.content.choisenCols.map((col: number) => (
                          <TableCell>
                            {test(
                              parsedFileStore.parsedFiles[
                                section.content.choisenTable
                              ].columns[col].columnValues
                            )}
                            {
                              parsedFileStore.parsedFiles[
                                section.content.choisenTable
                              ].columns[col].columnValues[i]
                            }
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              ''
            )
          ) : section.type === SectionType.HISTOGRAM ? (
            typeof section.content.choisenTable === 'number' &&
            section.content.valueCol !== null &&
            section.content.nameCol !== null ? (
              <Box
                height={500}
                display={'flex'}
                alignItems={'flex-end'}
                justifyContent={'flex-start'}
              >
                {getSortedValues(section).map((values) => (
                  <Box
                    height={values.value / values.maxValue}
                    width={100}
                    sx={{
                      backgroundColor: 'tomato',
                      color: 'white',
                      marginLeft: 6,
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: -20,
                        color: 'black',
                      }}
                    >
                      {values.name}
                    </div>
                  </Box>
                ))}
              </Box>
            ) : (
              ''
            )
          ) : (
            ''
          )}
          <hr
            style={{
              height: 2,
              background: 'rgba(0, 0, 0, 0.2)',
              marginTop: 30,
            }}
          />
        </Box>
      ))}
    </Box>
  );
});

export { Visual };

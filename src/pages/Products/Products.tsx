import { useState, useEffect, useCallback } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import { LoadIndicator } from 'devextreme-react/load-indicator';
import { IColumn, ICodesData } from '../../types/interfaces/TableProps';
import { formatColumnName, debounce } from '../../utils/helper';
import { fetchColumns, fetchData } from '../../services/tableApiService';
import { FaSearch } from 'react-icons/fa';
import s from './Products.module.scss';

const Products = () => {
  const [data, setData] = useState<ICodesData[]>([]);
  const [tableData, setTableData] = useState<ICodesData[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const visibleColumns: string[] = [
    'id',
    'klasifikacija',
    'naziv',
    'karakteristikaA',
    'karakteristikaB',
  ];

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchData(), fetchColumns()])
      .then(([data, colums]) => {
        setData(data);
        setTableData(data);
        setColumns(
          colums.map((item: string) => {
            return { key: item, isVisible: visibleColumns.includes(item) };
          })
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDoubleClickColumn = (key: string, isVisible: boolean) => {
    const element = columns.find((column: IColumn) => column.key === key);
    if (element !== undefined) {
      element.isVisible = isVisible;
      setColumns([...columns]);
    }
  };

  const handleSearch = useCallback(
    debounce((event: any) => {
      if (event.target.value.length > 2) {
        const results: ICodesData[] = [];
        data.map((item: ICodesData) => {
          Object.values(item).map((value: string) => {
            if (value && value.includes(event.target.value)) {
              results.push(item);
            }
          });
        });
        setTableData(results);
      } else {
        setTableData(data);
      }
    }, 1000),
    [data]
  );

  return (
    <>
      <h1>Proizvodi</h1>
      {isLoading ? (
        <div className={s.Loader}>
          <LoadIndicator id="medium-indicator" height={40} width={40} />
        </div>
      ) : (
        <div className={s.Container}>
          <div className={s.TableContainer}>
            <div className={s.Search}>
              <Input
                placeholder="Pretrazi"
                onChange={(event) => handleSearch(event)}
                icon={<FaSearch />}
              />
            </div>
            <DataGrid
              id="gridContainer"
              dataSource={tableData}
              keyExpr="id"
              width="100%"
              showBorders={true}
            >
              {columns.map((column: IColumn) => {
                return (
                  <Column
                    key={column.key}
                    visible={column.isVisible}
                    dataField={column.key}
                    caption={formatColumnName(column.key)}
                  />
                );
              })}
            </DataGrid>
          </div>
          <div className={s.Sidebar}>
            <div className={s.Box}>
              {columns.map((column: IColumn) => {
                return (
                  !column.isVisible && (
                    <Button
                      key={column.key}
                      onDoubleClick={() =>
                        handleDoubleClickColumn(column.key, true)
                      }
                      label={formatColumnName(column.key)}
                      variant="add"
                    />
                  )
                );
              })}
            </div>
            <div className={s.Box}>
              {columns.map((column: IColumn) => {
                return (
                  column.isVisible && (
                    <Button
                      key={column.key}
                      onDoubleClick={() =>
                        handleDoubleClickColumn(column.key, false)
                      }
                      label={formatColumnName(column.key)}
                      variant="remove"
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Products;

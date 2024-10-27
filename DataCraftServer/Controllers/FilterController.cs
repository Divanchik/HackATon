using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using System.Text;


[Route("api/[controller]")]
[ApiController]
public class FilterController : Controller
{
    [HttpPost("getColumnByFilter")]
    public async Task<FileData> GetFilteredData(Filter filter)
    {
        var sqlBuilder = new StringBuilder($"SELECT \"{filter.LinkedColumnName}\" FROM \"{filter.LinkedFileName}\" WHERE ");
        var parameters = new DynamicParameters();
        var parameterName = filter.ConditionCustomValue;

        string conditionClause = filter.Condition switch
        {
            Condition.EQUAL => $"\"{filter.LinkedColumnName}\" = \'{parameterName}\'",
            Condition.NOT_EQUAL => $"\"{filter.LinkedColumnName}\" <> \'{parameterName}\'",
        };

        sqlBuilder.Append(conditionClause);

        var columnDataList = new List<ColumnData>();

        using (IDbConnection _dbConnection = new NpgsqlConnection(DbConnection.ConnectionString))
        {
            var result = await _dbConnection.QueryAsync(sqlBuilder.ToString());

            columnDataList.Add(new ColumnData
            {
                ColumnName = filter.LinkedColumnName,
                ColumnValues = result
                    .Select(row => {
                        var rowDict = row as IDictionary<string, object>;
                        return rowDict != null && rowDict.ContainsKey(filter.LinkedColumnName)
                            ? rowDict[filter.LinkedColumnName]?.ToString()
                            : null;
                    })
                .ToList()
            });
        }

        return new FileData
        {
            FileName = filter.LinkedFileName!,
            Columns = columnDataList
        };
    }

}
    

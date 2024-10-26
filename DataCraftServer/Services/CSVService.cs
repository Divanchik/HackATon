using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;

namespace DataCraftServer.Services
{
    public class CSVService
    {
        private char _separator;
        public CSVService(char separator = ';') 
        {
            _separator = separator;
        }
        private object DetermineDataType(string value)
        {
            if (int.TryParse(value, out var intResult))
                return intResult;
            if (double.TryParse(value, out var doubleResult))
                return doubleResult;
            if (bool.TryParse(value, out var boolResult))
                return boolResult;
            if (DateTime.TryParse(value, out var dateResult))
                return dateResult;
            return value;
        }

        public async Task<List<Dictionary<string, object>>> ParseCsvFile(Stream stream)
        {
            var result = new List<Dictionary<string, object>>();
            using var reader = new StreamReader(stream);

            // Читаем заголовки колонок
            var headers = (await reader.ReadLineAsync())?.Split(_separator);
            if (headers?.Length == 1)
            {
                headers = (await reader.ReadLineAsync())?.Split(_separator);
            }


            if (headers == null) throw new Exception("Невозможно прочитать заголовки.");

            while (!reader.EndOfStream)
            {
                var values = (await reader.ReadLineAsync())?.Split(_separator);
                if (values == null) continue;

                var row = new Dictionary<string, object>();

                for (int i = 0; i < headers.Length && i < values.Length; i++)
                {
                    row[headers[i]] = DetermineDataType(values[i]);
                }

                result.Add(row);
            }

            return result;
        }

        public Dictionary<string, List<string>> ReadCsvColumns(Stream stream)
        {
            var result = new Dictionary<string, List<string>>();

            using var reader = new StreamReader(stream);
            var csvConfig = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = _separator.ToString(),
                BadDataFound = null,
                HasHeaderRecord = true
            };

            using var csv = new CsvReader(reader, csvConfig);

            // Читаем заголовки колонок
            csv.Read();
            csv.ReadHeader();

            if (csv?.HeaderRecord?.Length == 1)
            {
                csv.Read();
                csv.ReadHeader();
            }

            foreach (var header in csv.HeaderRecord)
            {
                result[header] = new List<string>();
            }

            // Читаем данные
            while (csv.Read())
            {
                foreach (var header in csv.HeaderRecord)
                {
                    // Если значение пустое, сохраняем пустую строку
                    var value = csv.GetField(header) ?? string.Empty;
                    result[header].Add(value);
                }
            }

            return result;
        }
    }
}

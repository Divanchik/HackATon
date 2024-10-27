namespace DataCraftServer.Models
{
    public class FilterSettings
    {
        public string fileName { get; set; }
        public List<String> columns { get; set; }
        int? limit { get; set; }
        int? offset { get; set; }
    }

    public class LinkOperator
    {
        public Condition? Condition { get; set; }
        public List<Filter>? Filters { get; set; }
    }

    public class Filter
    {
        public string LinkedFileName { get; set; }
        public string LinkedColumnName { get; set; }
        public string ConditionCustomValue { get; set; }
        public Condition Condition { get; set; }
    }

    public enum Condition
    {
        AND,
        OR,
        EQUAL,
        NOT_EQUAL
    }
}

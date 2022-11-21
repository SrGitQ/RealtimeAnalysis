from google.cloud import bigquery



client = bigquery.Client()
table_id = "twitter-streaming-365514.testing.tab"

def write(tweet):
    client.insert_rows_json(table_id, [tweet])

if __name__ == '__main__':
    write({'name': 'Juan', 'age': 24})

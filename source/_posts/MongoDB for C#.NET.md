---
title: MongoDB for C#/.NET
tags:
  - C#
  - MongoDB
  - 记录
categories:
  - 记录
  - MongoDB
abbrlink: 530611942
date: 2023-11-22 11:07:52
updated: 2023-11-22 11:07:52
cover: /posts/2023/530611942/封面.png
---

# MongoDB 的更新操作符

## $符号

这个符号是一个占位符，用来更新数组中匹配查询条件的第一个元素。例如，如果你想要更新books数组中title为"The Catcher in the Rye"的元素的author字段，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Eq("books.title", "The Catcher in the Rye");
var update = Builders<BsonDocument>.Update.Set("books.$.author", "J.D. Salinger");
col.UpdateOne(filter, update);
```

## $[]符号

这个符号是一个占位符，用来更新数组中的所有元素。例如，如果你想要更新books数组中所有元素的price字段，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.Set("books.$[].price", 9.99);
col.UpdateMany(filter, update);
```

## $[\<identifier>]符号

这个符号是一个占位符，用来更新数组中匹配arrayFilters条件的所有元素。  
- 如果你想要更新books数组中price大于10的元素的discount字段，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.Set("books.$[elem].discount", 0.8);
var arrayFilters = new List<ArrayFilterDefinition> {
    new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("elem.price", new BsonDocument("$gt", 10)))
};
col.UpdateMany(filter, update, new UpdateOptions { ArrayFilters = arrayFilters });
```

- 如果你想要替换数组caricature中name为DeathNote的元素的全部内容，用一个新的集合来代替，你可以使用以下代码来实现这个功能：

```c#
// 定义一个新的集合，用来替换原来的元素
var newBook = new BsonDocument {
    { "name", "DeathNote" },
    { "Year", "2004" },
    { "price", "10" },
};

// 定义一个过滤条件，用来匹配你想要更新的文档的_id字段
var filter = Builders<BsonDocument>.Filter.Eq("_id", "01");

// 定义一个更新操作，用来替换caricature数组中name为DeathNote的元素
var update = Builders<BsonDocument>.Update.Set("caricature.$[elem]", newBook);

// 定义一个数组过滤条件，用来指定你想要替换的数组元素的name值
var arrayFilters = new List<ArrayFilterDefinition> {
    new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("elem.name", "DeathNote"))
};

// 执行更新操作，根据过滤条件和数组过滤条件来修改文档的字段的值
col.UpdateOne(filter, update, new UpdateOptions { ArrayFilters = arrayFilters });
```

## 增加

### $push
这个符号用来向数组中添加一个元素。例如，如果你想要向books数组中添加一个元素，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.Push("books", new BsonDocument { { "title", "The Catcher in the Rye" }, { "author", "J.D. Salinger" }, { "price", 9.99 } });
col.UpdateOne(filter, update);
```

### $addToSet
这个符号用来向数组中添加元素，只有当元素不存在于数组中时才会添加。例如，如果你想要向books数组中添加一个新的元素，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.AddToSet("books", new BsonDocument { { "title", "1984" }, { "author", "George Orwell" }, { "price", 8.99 } });
col.UpdateOne(filter, update);
```

## 删除
### $pop
这个符号用来从数组中移除第一个或最后一个元素。例如，如果你想要从books数组中移除最后一个元素，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.PopLast("books");
col.UpdateOne(filter, update);
```

### $pull
这个符号用来从数组中移除所有匹配指定查询的元素。例如，如果你想要从books数组中移除author为"J.D. Salinger"的元素，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.Pull("books", new BsonDocument("author", "J.D. Salinger"));
col.UpdateOne(filter, update);
```

### $pullAll
这个符号用来从数组中移除所有匹配指定值的元素。例如，如果你想要从books数组中移除title为"1984"或"The Catcher in the Rye"的元素，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Empty;
var update = Builders<BsonDocument>.Update.PullAll("books", new BsonArray { new BsonDocument("title", "1984"), new BsonDocument("title", "The Catcher in the Rye") });
col.UpdateOne(filter, update);
```

## 修改
### $rename
这个符号用来重命名文档中的字段。 例如，如果你想要把`books`数组中`title`为`"1984"`的元素的`price`字段重命名为`"cost"`，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Eq("books.title", "1984");
var update = Builders<BsonDocument>.Update.Rename("books.$.price", "books.$.cost");
col.UpdateOne(filter, update);
```

### $set
这个符号用来设置文档中的字段的值。 例如，如果你想要给`books`数组中`title`为`"1984"`的元素的`cost`字段设置为8.99，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Eq("books.title", "1984");
var update = Builders<BsonDocument>.Update.Set("books.$.cost", 8.99);
col.UpdateOne(filter, update);
```

### $unset
这个符号用来删除文档中的字段。 例如，如果你想要删除`books`数组中`title`为`"1984"`的元素的`cost`字段，你可以使用以下代码：

```c#
var filter = Builders<BsonDocument>.Filter.Eq("books.title", "1984");
var update = Builders<BsonDocument>.Update.Unset("books.$.cost");
col.UpdateOne(filter, update);
```
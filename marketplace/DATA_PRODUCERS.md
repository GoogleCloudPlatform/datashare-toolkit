# ```Data Producers Field```
## Summary
The data producers field is the administrative user or users for the Datashare UI and it has specific formatting requirements depending on your use case. Use this documentation to determine how to enter the required format.

## Use Cases

### Single Data Producer
If you want to enter a single data producer or user, then enter the email address as shown below. 

```
user@example.com
```

### Multiple Data Producers
In order to include multiple users, please enter the email addresses as shown below. Do not enter any spaces between commas or include any quotes.

```
user1@example.com,user2@example.com
```

### Wildcard Data Producer
In order to include a wild card data producer, please enter the email address as shown below. You **must** enter the double quotes without any spaces at the beginning or end of the wildcard email address. 

```
"*@example.com"
```


### Multiple Wildcard Data Producer
In order to include a wild card data producer, please enter the email address as shown below. You **must** enter the double quotes without any spaces at the beginning or end of the wildcard email address. 

```
"*@example.com,*@data.example.com"
```

[Back to Datashare](./README.md)

# Overview
Data Producers are users that should have administrative access to the Datashare UI. To modify the list of Data Producers for an existing setup, you must edit the ```allow-data-producers``` authorization policy. Run the following command to edit the authorization policy.

```
export NAMESPACE=datashare-apis
kubectl edit authorizationpolicy.security.istio.io/allow-data-producers -n "$NAMESPACE"
```

Scroll to the bottom and you'll see a when condition that looks like this:

```
    when:
    - key: request.auth.claims[email]
      values:
      - '*@google.com'
```

Modify the values portion to include the list of domains or users.
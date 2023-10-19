# FE-JustConnect

src/
common/
data/
domain/
presentation/

## In detail, the purpose of each file structure is the following:

- Data: The data folder represents the data layer of the Clean Architecture, being dependent on the domain layer. Contains the implementations of business rules that are declared in domain (classes). Therefore, these classes know about API and platform dependent things (local storage, cookies, etc.).

- Domain: Represents the domain layer of the Clean Architecture, the innermost layer of the application, not having any dependency on any other layer, where it contains the business rules. Here you will find Models, Use Cases. Models are entities with logic and structures are simple data structures (like POJO in Java). In models we put classes with which we (developers) directly and often work, and in structures — objects that are returned by the server as JSON-objects (hello, json2ts) and we use them to transfer between layers.

- Presentation: This folder contains the visual part of the application, with its pages, components, hooks, assets and styling. Also it contains util for various validations, utilities, etc.

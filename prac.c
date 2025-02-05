#include <stdio.h>
#include <stdlib.h>
typedef struct node
{
    int num;
    struct node *next;
} Node;
Node *createNode(int num);
void addNode(int num, Node *head);
void displayNode(Node *head);
int main()
{
    Node *head = NULL;
    addNode(10, head);
    addNode(20, head);
    addNode(30, head);
    addNode(40, head);
    addNode(50, head);
    displayNode(head);
}
Node *createNode(int num)
{
    Node *temp = (Node *)malloc(sizeof(Node));
    temp->num = num;
    temp->next = NULL;
    return temp;
}
void addNode(int num, Node *head)
{
    Node *temp = head;
    while (temp->next != NULL)
    {
        temp = temp->next;
    }
    temp->next = createNode(num);
}
void displayNode(Node *head)
{
    Node *temp = head;
    while (temp->next != NULL)
    {
        printf("%d->", temp->num);
    }
    printf("NULL");
}

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import React from "react";

interface AdminCardProps {
  header: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

function AdminCard({ header, body, footer }: AdminCardProps) {
  return (
    <Card border="1px" borderColor="gray.200" boxShadow='lg' >
      <CardHeader>
        <Heading size="md">{header}</Heading>
      </CardHeader>
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default AdminCard;

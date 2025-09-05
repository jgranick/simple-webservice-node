// WSDL Definition for SOAP service
const wsdl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:tns="http://localhost:3001/UserService"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             targetNamespace="http://localhost:3001/UserService"
             elementFormDefault="qualified">

  <types>
    <xsd:schema targetNamespace="http://localhost:3001/UserService">
      <xsd:complexType name="User">
        <xsd:sequence>
          <xsd:element name="id" type="xsd:int"/>
          <xsd:element name="name" type="xsd:string"/>
          <xsd:element name="email" type="xsd:string"/>
          <xsd:element name="age" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="UserArray">
        <xsd:sequence>
          <xsd:element name="user" type="tns:User" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="GetAllUsersResponse">
        <xsd:sequence>
          <xsd:element name="users" type="tns:UserArray"/>
          <xsd:element name="count" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="GetUserRequest">
        <xsd:sequence>
          <xsd:element name="id" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="GetUserResponse">
        <xsd:sequence>
          <xsd:element name="user" type="tns:User"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="CreateUserRequest">
        <xsd:sequence>
          <xsd:element name="name" type="xsd:string"/>
          <xsd:element name="email" type="xsd:string"/>
          <xsd:element name="age" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="CreateUserResponse">
        <xsd:sequence>
          <xsd:element name="user" type="tns:User"/>
          <xsd:element name="message" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="UpdateUserRequest">
        <xsd:sequence>
          <xsd:element name="id" type="xsd:int"/>
          <xsd:element name="name" type="xsd:string" minOccurs="0"/>
          <xsd:element name="email" type="xsd:string" minOccurs="0"/>
          <xsd:element name="age" type="xsd:int" minOccurs="0"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="UpdateUserResponse">
        <xsd:sequence>
          <xsd:element name="user" type="tns:User"/>
          <xsd:element name="message" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="DeleteUserRequest">
        <xsd:sequence>
          <xsd:element name="id" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="DeleteUserResponse">
        <xsd:sequence>
          <xsd:element name="user" type="tns:User"/>
          <xsd:element name="message" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="HealthResponse">
        <xsd:sequence>
          <xsd:element name="message" type="xsd:string"/>
          <xsd:element name="timestamp" type="xsd:string"/>
          <xsd:element name="uptime" type="xsd:float"/>
        </xsd:sequence>
      </xsd:complexType>
      
      <xsd:complexType name="ErrorResponse">
        <xsd:sequence>
          <xsd:element name="message" type="xsd:string"/>
        </xsd:sequence>
      </xsd:complexType>
    </xsd:schema>
  </types>

  <message name="GetAllUsersRequest">
  </message>
  <message name="GetAllUsersResponse">
    <part name="parameters" element="tns:GetAllUsersResponse"/>
  </message>
  
  <message name="GetUserRequest">
    <part name="parameters" element="tns:GetUserRequest"/>
  </message>
  <message name="GetUserResponse">
    <part name="parameters" element="tns:GetUserResponse"/>
  </message>
  
  <message name="CreateUserRequest">
    <part name="parameters" element="tns:CreateUserRequest"/>
  </message>
  <message name="CreateUserResponse">
    <part name="parameters" element="tns:CreateUserResponse"/>
  </message>
  
  <message name="UpdateUserRequest">
    <part name="parameters" element="tns:UpdateUserRequest"/>
  </message>
  <message name="UpdateUserResponse">
    <part name="parameters" element="tns:UpdateUserResponse"/>
  </message>
  
  <message name="DeleteUserRequest">
    <part name="parameters" element="tns:DeleteUserRequest"/>
  </message>
  <message name="DeleteUserResponse">
    <part name="parameters" element="tns:DeleteUserResponse"/>
  </message>
  
  <message name="HealthRequest">
  </message>
  <message name="HealthResponse">
    <part name="parameters" element="tns:HealthResponse"/>
  </message>

  <portType name="UserServicePortType">
    <operation name="getAllUsers">
      <input message="tns:GetAllUsersRequest"/>
      <output message="tns:GetAllUsersResponse"/>
    </operation>
    <operation name="getUser">
      <input message="tns:GetUserRequest"/>
      <output message="tns:GetUserResponse"/>
    </operation>
    <operation name="createUser">
      <input message="tns:CreateUserRequest"/>
      <output message="tns:CreateUserResponse"/>
    </operation>
    <operation name="updateUser">
      <input message="tns:UpdateUserRequest"/>
      <output message="tns:UpdateUserResponse"/>
    </operation>
    <operation name="deleteUser">
      <input message="tns:DeleteUserRequest"/>
      <output message="tns:DeleteUserResponse"/>
    </operation>
    <operation name="health">
      <input message="tns:HealthRequest"/>
      <output message="tns:HealthResponse"/>
    </operation>
  </portType>

  <binding name="UserServiceBinding" type="tns:UserServicePortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="getAllUsers">
      <soap:operation soapAction="getAllUsers"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="getUser">
      <soap:operation soapAction="getUser"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="createUser">
      <soap:operation soapAction="createUser"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="updateUser">
      <soap:operation soapAction="updateUser"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="deleteUser">
      <soap:operation soapAction="deleteUser"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
    <operation name="health">
      <soap:operation soapAction="health"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="UserService">
    <port name="UserServicePort" binding="tns:UserServiceBinding">
      <soap:address location="http://localhost:3001/soap"/>
    </port>
  </service>
</definitions>`;

module.exports = wsdl;

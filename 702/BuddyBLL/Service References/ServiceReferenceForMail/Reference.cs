﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.269
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BuddyBLL.ServiceReferenceForMail {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="MessageAttachment", Namespace="http://schemas.datacontract.org/2004/07/CTS.OneC.Messaging.Data.Contracts")]
    [System.SerializableAttribute()]
    public partial class MessageAttachment : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private byte[] FileContentField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string FileNameField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public byte[] FileContent {
            get {
                return this.FileContentField;
            }
            set {
                if ((object.ReferenceEquals(this.FileContentField, value) != true)) {
                    this.FileContentField = value;
                    this.RaisePropertyChanged("FileContent");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string FileName {
            get {
                return this.FileNameField;
            }
            set {
                if ((object.ReferenceEquals(this.FileNameField, value) != true)) {
                    this.FileNameField = value;
                    this.RaisePropertyChanged("FileName");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServiceReferenceForMail.IRequestUnifiedVASContract")]
    public interface IRequestUnifiedVASContract {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRequestUnifiedVASContract/Notify", ReplyAction="http://tempuri.org/IRequestUnifiedVASContract/NotifyResponse")]
        string Notify(string inputXml, BuddyBLL.ServiceReferenceForMail.MessageAttachment[] attachments);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IRequestUnifiedVASContractChannel : BuddyBLL.ServiceReferenceForMail.IRequestUnifiedVASContract, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class RequestUnifiedVASContractClient : System.ServiceModel.ClientBase<BuddyBLL.ServiceReferenceForMail.IRequestUnifiedVASContract>, BuddyBLL.ServiceReferenceForMail.IRequestUnifiedVASContract {
        
        public RequestUnifiedVASContractClient() {
        }
        
        public RequestUnifiedVASContractClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public RequestUnifiedVASContractClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public RequestUnifiedVASContractClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public RequestUnifiedVASContractClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public string Notify(string inputXml, BuddyBLL.ServiceReferenceForMail.MessageAttachment[] attachments) {
            return base.Channel.Notify(inputXml, attachments);
        }
    }
}
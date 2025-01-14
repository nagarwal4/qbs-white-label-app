﻿// Copyright 2023 Quantoz Technology B.V. and contributors. Licensed
// under the Apache License, Version 2.0. See the NOTICE file at the root
// of this distribution or at http://www.apache.org/licenses/LICENSE-2.0

namespace Core.Domain
{
    public static class Constants
    {
        public static class PrivateCustomerPersonalData
        {
            public const string DateOfBirth = "DateOfBirth";
            public const string FirstName = "FirstName";
            public const string LastName = "LastName";
            public const string Phone = "Phone";
            public const string CountryOfResidence = "CountryOfResidence";
        }

        public static class MerchantCustomerPersonalData
        {
            public const string CompanyName = "CompanyName";
            public const string ContactPersonFullName = "ContactPersonFullName";
            public const string CountryOfRegistration = "CountryOfRegistration";
        }
    }
}

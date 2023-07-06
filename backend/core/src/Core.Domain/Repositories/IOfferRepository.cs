﻿// Copyright 2023 Quantoz Technology B.V. and contributors. Licensed
// under the Apache License, Version 2.0. See the NOTICE file at the root
// of this distribution or at http://www.apache.org/licenses/LICENSE-2.0

using Core.Domain.Entities.OfferAggregate;

namespace Core.Domain.Repositories
{
    public interface IOfferRepository : IRepository<Offer>
    {
        Task<Offer> GetByOfferCodeAsync(string offerCode, CancellationToken cancellationToken = default);
    }
}
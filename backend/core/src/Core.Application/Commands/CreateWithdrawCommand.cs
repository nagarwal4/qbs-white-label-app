﻿// Copyright 2023 Quantoz Technology B.V. and contributors. Licensed
// under the Apache License, Version 2.0. See the NOTICE file at the root
// of this distribution or at http://www.apache.org/licenses/LICENSE-2.0

using Core.Application.Abstractions;
using Core.Domain.Entities.TransactionAggregate;
using Core.Domain.Repositories;
using MediatR;

namespace Core.Application.Commands
{
    public class CreateWithdrawCommand : IWithComplianceCheckCommand<Unit>
    {
        public required string CustomerCode { get; set; }

        public required string TokenCode { get; set; }

        public decimal Amount { get; set; }

        public string? Memo { get; set; }

        public required string IP { get; set; }
    }

    public class CreateWithdrawCommandHandler : IRequestHandler<CreateWithdrawCommand>
    {
        private readonly ITransactionRepository _transactionRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateWithdrawCommandHandler(
            ITransactionRepository transactionRepository,
            IAccountRepository accountRepository,
            ICustomerRepository customerRepository,
            IUnitOfWork unitOfWork)
        {
            _transactionRepository = transactionRepository;
            _accountRepository = accountRepository;
            _customerRepository = customerRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateWithdrawCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepository.GetAsync(request.CustomerCode, cancellationToken);
            var account = await _accountRepository.GetByCustomerCodeAsync(request.CustomerCode, cancellationToken);

            // var withdraw = customer.NewWithdraw(account, request.TokenCode, request.Amount, request.Memo);
            var withdraw = Withdraw.Create(account.PublicKey, request.TokenCode, request.Amount, customer, request.Memo);

            await _transactionRepository.CreateWithdrawAsync(withdraw, request.IP, cancellationToken);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}

using Microsoft.AspNet.Identity;
using ProjetoeExemplo.Infrastructure;
using ProjetoeExemplo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProjetoeExemplo.Controllers
{
	[RoutePrefix("api/accounts")]
	public class AccountsController : BaseApiController
	{
		//[Authorize]
		[Route("users")]
		public IHttpActionResult GetUsers()
		{
			return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
		}

		[Authorize(Roles = "Project_Manager")]
		[Route("users2")]
		public IHttpActionResult GetUsersnd()
		{
			return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
		}



		[Authorize]
		[Route("user/{id:guid}", Name = "GetUserById")]
		public async Task<IHttpActionResult> GetUser(string Id)
		{
			var user = await this.AppUserManager.FindByIdAsync(Id);

			if (user != null)
			{
				return Ok(this.TheModelFactory.Create(user));
			}

			return NotFound();

		}

		[Authorize]
		[Route("user/{username}")]
		public async Task<IHttpActionResult> GetUserByName(string username)
		{
			var user = await this.AppUserManager.FindByNameAsync(username);

			if (user != null)
			{
				return Ok(this.TheModelFactory.Create(user));
			}

			return NotFound();

		}

		[AllowAnonymous]
		[Route("create")]
		public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var user = new ApplicationUser()
			{
				UserName = createUserModel.Username,
				Email = createUserModel.Email,
				FirstName = createUserModel.FirstName,
				LastName = createUserModel.LastName,
				EmailConfirmed = true,
				Level = 3,
				JoinDate = DateTime.Now.Date,
			};

			IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, createUserModel.Password);

			if (!addUserResult.Succeeded)
			{
				return GetErrorResult(addUserResult);
			}

			// add to roles
			await this.AppUserManager.AddToRoleAsync(user.Id, createUserModel.RoleName);

			Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

			return Created(locationHeader, TheModelFactory.Create(user));
		}

		[Authorize]
		[Route("ChangePassword")]
		public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			IdentityResult result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

			if (!result.Succeeded)
			{
				return GetErrorResult(result);
			}

			return Ok();
		}

	}


}
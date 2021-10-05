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
	[RoutePrefix("api/tasks")]
	public class TaskController : BaseApiController
	{

		private ApplicationDbContext db = new ApplicationDbContext();

		//[Authorize]
		[Route("tasks")]
		public IHttpActionResult GetTasks()
		{
			var projectlist = db.TaskDos.ToList();

			return Ok(projectlist);
		}

		[Route("users")]
		public IHttpActionResult GetUsers()
		{
			return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
		}


		[Route("createTask")]
		public async Task<IHttpActionResult> CreateTask(TaskDo createTaskModel)
		{
			if (ModelState.IsValid)
			{
				db.TaskDos.Add(createTaskModel);
				db.SaveChanges();
			}

			return Ok();

		}

		[Route("deleteTasks")]
		public async Task<IHttpActionResult> apagaTask(TaskDo createTaskModel)
		{
			if (ModelState.IsValid)
			{
				TaskDo taskTable = db.TaskDos.Find(createTaskModel.Id);
				db.TaskDos.Remove(taskTable);
				db.SaveChanges();
			}

			return Ok();

		}

	}


}
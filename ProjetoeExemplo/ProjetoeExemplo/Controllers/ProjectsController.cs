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
	[RoutePrefix("api/projects")]
	public class ProjectsController : BaseApiController
	{

		private ApplicationDbContext db = new ApplicationDbContext();

		[Authorize]
		[Route("projects")]
		public IHttpActionResult GetProjects()
		{
			var projectlist = db.Projects.ToList();

			return Ok(projectlist);
		}

		[Authorize(Roles = "Project_Manager")]
		[Route("users")]
		public IHttpActionResult GetUsers()
		{
			return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
		}

		[Authorize(Roles = "Project_Manager")]
		[Route("createProject")]
		public async Task<IHttpActionResult> CreateProject(Project createProjectModel)
		{
			if (ModelState.IsValid)
			{
				db.Projects.Add(createProjectModel);
				db.SaveChanges();
			}

			return Ok();

		}

		[Authorize(Roles = "Project_Manager")]
		[Route("delProject")]
		public async Task<IHttpActionResult> delProject(Project createProjectModel)
		{
			Project projectTable = db.Projects.Find(createProjectModel.Id);
			if (projectTable != null)
            {
				// Error in cascade deletion. Manual deletion of conected tasks bellow
				var tasksofproject = (from b in db.TaskDos
							where b.ProjectId == projectTable.Id
							select b).ToArray();

				if (tasksofproject.Length != 0)
                {
					for (int i = 0; i < tasksofproject.Length; i++)
					{
						db.TaskDos.Remove(tasksofproject[i]);
					}

				}

				db.Projects.Remove(projectTable);
				db.SaveChanges();
            }
            else
            {
				return BadRequest();
            }
			//if (ModelState.IsValid)
			//{
			//	Project projectTable = db.Projects.Find(createProjectModel.Id);
			//	db.Projects.Remove(projectTable);
			//	db.SaveChanges();
			//}

			return Ok();

		}

	}


}
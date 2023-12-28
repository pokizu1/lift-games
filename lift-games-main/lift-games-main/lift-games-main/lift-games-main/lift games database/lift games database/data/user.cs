using System.ComponentModel.DataAnnotations;

namespace lift_games_database.data
{
    public class user
    {

        public int id { get; set; }

        [MaxLength(30)]
        public string username { get; set; }
        public string password { get; set; }
        public string role { get; set; }

        public user()
        {
            if(role == "string")
            {
                role = "user";
            }
            role = "user";



        }
    }
}

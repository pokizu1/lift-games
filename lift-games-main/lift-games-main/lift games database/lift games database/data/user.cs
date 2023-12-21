namespace lift_games_database.data
{
    public class user
    {

        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string role { get; set; }

        public user()
        {
            role = "user";



        }
    }
}

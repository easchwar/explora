contents = File.readlines("topic_names_raw.txt")

stripped = contents.map do |line|
  line.split("(").first.strip + "\n"
end

File.open("topic_names.txt", "w") do |f|
  stripped.each do |line|
    f.puts line
  end
end
